export default function Home() {
  return (
      <>
        <main className="min-h-screen bg-green-100">
          <header className="p-4 bg-green-500">
            <h1 className="text-4xl">Cookie Stand Admin</h1>
          </header>
          <div className="flex justify-center my-8">
            <form className="w-5/6 p-4 bg-green-300 rounded-md md:w-1/2 lg:w-1/3">
                <h2 className="mb-3 text-2xl text-center">Create Cookie Stand</h2>
                <div className="mb-4">
                  <label htmlFor="location" className="block">Location</label>
                  <input id="location" type="text" className="w-full p-2" />
                </div>
                <div className="flex flex-wrap items-end gap-4 mb-4">
                  <div className="flex-1">
                    <label htmlFor="minCustomers" className="block text-center">Minimum Customers per Hour</label>
                    <input id="minCustomers" type="number" className="w-full p-2" />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="maxCustomers" className="block text-center">Maximum Customers per Hour</label>
                    <input id="maxCustomers" type="number" className="w-full p-2" />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="avgCookies" className="block text-center">Average Cookies per Sale</label>
                    <input id="avgCookies" type="number" className="w-full p-2" step="0.1" />
                  </div>
                  <div className="w-full sm:w-auto">
                    <button type="submit" className="w-full px-5 py-2 mt-4 bg-green-500 font- sm:w-auto sm:mt-0">Create</button>
                  </div>
                </div>
                
              </form>
            </div>
            <div className="flex justify-center my-8">
              <h4 className="text-2xl">Report Table Coming Soon...</h4>
            </div>
        <footer className="p-4 mt-8 bg-green-500">
          <p>&copy;2024</p>
        </footer>
      </main>
    </>
  );
}
