import sharp from 'sharp';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
    const imageUrl: any = url.searchParams.get('url');

    try {
        // Fetch the image
        const response = await fetch(imageUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'image/jpeg',
                'Access-Control-Allow-Origin': '*'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        // Read the image data as ArrayBuffer
        const imageArrayBuffer = await response.arrayBuffer();

        // Process the image using sharp
        const enhancedImageBuffer = await sharp(imageArrayBuffer)
            .rotate() // Optional, based on the image's requirements
            .sharpen() // Sharpen the image
            .modulate({ // Adjust brightness and contrast
                brightness: 1.1,
                contrast: 1.1
            })
            .webp({ quality: 100 }) // Convert to WebP with highest quality
            .toBuffer();

        return new Response(enhancedImageBuffer, {
            headers: {
                'Content-Type': 'image/webp',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': `public, s-maxage=${60 * 60 * 24 * 365}`
            }
        });
    } catch (error) {
        console.error('Error processing image:', error);
        return new Response(JSON.stringify({ message: 'Failed to process image', error }), {
            status: 500
        });
    }
};
