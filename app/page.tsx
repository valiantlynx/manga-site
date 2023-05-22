
import Welcome from '@/app/components/Welcome';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 bg-base-200">
    <Welcome />
    </main>
  )
}