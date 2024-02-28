import Head from 'next/head';
import { useState } from 'react'; 


export default function Home() {

  const [formData, setFormData] = useState({
    location: '',
    minCustomers: '',
    maxCustomers: '',
    avgCookies: ''
  });

  // State to hold the last created Cookie Stand
  const [lastCreated, setLastCreated] = useState(null);

  // Update form data state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    setLastCreated(formData); // Set the last created cookie stand to the current form data
    // Here is where I will send the data to a server
  }
  
  return (
    <>
      <Head>
        <title>Cookie Stand Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-green-100">
        <header className="p-4 bg-green-500">
          <h1 className="text-4xl">Cookie Stand Admin</h1>
        </header>
        <div className="flex justify-center my-8">
          <form onSubmit={handleSubmit} className="w-5/6 p-4 bg-green-300 rounded-md md:w-1/2 lg:w-1/3">
            <h2 className="mb-3 text-2xl text-center">Create Cookie Stand</h2>
            <div className="mb-4">
              <label htmlFor="location" className="block">Location</label>
              <input
                name="location"
                id="location"
                type="text"
                className="w-full p-2"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-wrap items-end gap-4 mb-4">
              <div className="flex-1">
                <label htmlFor="minCustomers" className="block text-center">Minimum Customers per Hour</label>
                <input
                  name="minCustomers"
                  id="minCustomers"
                  type="number"
                  className="w-full p-2"
                  value={formData.minCustomers}
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="maxCustomers" className="block text-center">Maximum Customers per Hour</label>
                <input
                  name="maxCustomers"
                  id="maxCustomers"
                  type="number"
                  className="w-full p-2"
                  value={formData.maxCustomers}
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="avgCookies" className="block text-center">Average Cookies per Sale</label>
                <input
                  name="avgCookies"
                  id="avgCookies"
                  type="number"
                  className="w-full p-2"
                  step="0.1"
                  value={formData.avgCookies}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full sm:w-auto">
                <button type="submit" className="w-full px-5 py-2 mt-4 font-bold text-white bg-green-500 sm:w-auto sm:mt-0">Create</button>
              </div>
            </div>
          </form>
        </div>
        {lastCreated && (
          <div className="flex justify-center my-8">
            <pre className="p-4 bg-gray-100 rounded-md">{JSON.stringify(lastCreated, null, 2)}</pre>
          </div>
        )}
        <p className="text-center">Report Data Coming Soon...</p>
        <br></br>
        <footer className="p-4 bg-green-500">
          <p>&copy; {new Date().getFullYear()}</p>
        </footer>
      </main>
    </>
  );
}
