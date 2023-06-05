import RequestSearch from '@/app/components/RequestSearch'

export const metadata = {
  title: "Welcome to AnimeVariant",
}

// page to teach users how to populate manga, there are three ways. one is through search, this will get the manga and populate the details. them you have to populate the chapters of that manga. laslty you can populate the chapters of a manga by going to the manga page and clicking the populate button. this you will populate the chapters of that manga. 
function page() {
  return (
    <main className="flex flex-col items-center justify-between my-10 bg-base-200 text-base-content">
      <div className="flex flex-col items-center justify-center my-10">
        <h1 className="text-4xl font-bold">Welcome to AnimeVariant</h1>
        <p className="text-xl font-semibold">Here you can learn how to populate manga. Get your favourite manga within minutes</p>

      </div>
      <div className="flex flex-col items-center justify-center my-10">
        <h2 className="text-2xl font-bold">How to populate manga</h2>
        <p className="text-xl font-semibold">There are three ways to populate manga</p>

      </div>
      <div className="flex flex-col items-center justify-center my-10">
        <h3 className="text-xl font-bold">1. Search</h3>
        <p className="text-lg font-semibold">This will get the manga and populate ONLY the details of the manga. Your manga should now be our website. Then you have to populate the chapters of that manga. Search your manga below then continue.</p>
        <RequestSearch />
      </div>
      <div className="flex flex-col items-center justify-center my-10">
        <h3 className="text-xl font-bold">2. Manga Page</h3>
        <p className="text-lg font-semibold">At the end of every manga details page, there is a button that says "Request the manga", just click it. If you refresh you'll see the chapters appear. Its Done if on refreshing there is no change </p>
      </div>
      <div className="flex flex-col items-center justify-center my-10">
        <h3 className="text-xl font-bold">3. Chapter page</h3>
        <p className="text-lg font-semibold">At the end of every chapter page, there is a button that says "Request the chapter", just click it. If you refresh you'll see the chapters appear. Its Done if on refreshing there is no change</p>
      </div>
      <h2 className="text-2xl font-bold">You're Done!</h2>
      <div className="flex flex-col items-center justify-center my-10">
        <h2 className="text-2xl font-bold">One last thing</h2>
        <p className="text-xl font-semibold">You might see a button at the bottom of the homepage with the text "Request all the manga in page *number*. This will populate all the 48 manga depending on the number you see. This is useful if you want to populate all the manga in a page. The lower the number the more popular the manga.</p>

      </div>

    </main>
  )
}

export default page