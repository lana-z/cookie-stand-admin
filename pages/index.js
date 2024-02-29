import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import { hours } from '../data';


export default function Home() {  

  const [standReports, setStandReports] = useState([]);
  
  function handleCreate(standData) {
    setStandReports([...standReports, standData]);
};
  
  return (
    <>
    <Head>
      <title>Cookie Stand Admin</title>
    </Head>
      <Header />
      <main className='p-8'>
        <CreateForm onCreate={handleCreate} />
        <Report reports={standReports} hours={hours} />
      </main>
      <Footer numLocations={standReports.length}/>
    </>
  );
}


function Header() {
  return (
    <header className="p-4 bg-green-500">
      <h1 className="text-4xl">Cookie Stand Admin</h1>
      <nav>
      </nav>
    </header>
  );
}

function Footer({ numLocations}) {
  return (
    <footer className="p-4 bg-green-500">
      {/* <p>&copy; {new Date().getFullYear()}</p> */}
      <p>{ numLocations } Locations Worldwide</p>
    </footer>
  );
}

function Report (props) {
  
  if (props.reports.length === 0) {
    return <p className="mt-8 text-2xl text-center">There are no locations up and running yet.</p>;
  }

  const headers = ['Location', ...props.hours, 'Totals'];

  return (
    <table className="w-2/3 mx-auto my-8 bg-green-300 rounded-lg">
      <HeaderRow headers={headers} />

      <tbody>
          {props.reports.map((report) => {
            return <ReportRow key={report.location} report={report} />;
          })}
          </tbody>
          
          <FooterRow reports={props.reports} />
          
    </table>       
    );
}

function HeaderRow({ headers }) {
  return (
    <thead className="bg-green-500">
      <tr>
        {headers.map((header, index) => {
          let className ="";
          if (index === 0) {
            className = "rounded-tl";
          } else if (index === headers.length - 1) {
            className = "rounded-tr";
          }
          return <th className={className} key={header}>{header}</th>;
        })}
      </tr>
    </thead>
  );
}

function ReportRow({ report }) {
  const total = report.hourly_sales.reduce((sum, value) => sum + value, 0);
  const values = [report.location, ...report.hourly_sales, total];

  return (
    
    <tr className="odd:bg-green-400">
      {values.map((value, index) => {
        let className = "";
        if (index === 0) {
          className = "rounded-bl";
        } else if (index === values.length - 1) {
          className = "rounded-br";
        }
        return <td className={className} key={value}>{value}</td>;
      })}
    </tr>
  );
}

function FooterRow({ reports }) {
  const cells = ['Totals'];

  let grandTotal = 0;

  for (let i in reports[0].hourly_sales) {
    let hourlyTotal = 0;

    for (let report of reports) {
      hourlyTotal += report.hourly_sales[i];
    }

    cells.push(hourlyTotal);
    
    grandTotal += hourlyTotal;
  }
  cells.push(grandTotal);
  return (
    <tfoot>
      <tr>
        {cells.map((cell, index) => {
          let className = "border border-green-900";
          if (index === 0) {
            className += "rounded-bl";
          } else if (index === cells.length - 1) {
            className += "rounded-br";
          }
          return <th className={className} key={index}>{cell}</th>;
        })}
      </tr>
    </tfoot>
  );
}

function CreateForm(props) {
  const [formData, setFormData] = useState({
    location: '',
    minCustomers: '',
    maxCustomers: '',
    avgCookies: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    const hourly_sales = hours.map(() => {
      const min = Math.ceil(formData.minCustomers);
      const max = Math.floor(formData.maxCustomers);
      const customersPerHour = Math.floor(Math.random() * (max - min + 1)) + min;
      return Math.round(customersPerHour * formData.avgCookies);
    });
    
    const standData = {
      id: formData.location.replace(/\s+/g, '-').toLowerCase(), // Unique ID based on location
      location: formData.location,
      minCustomers: parseInt(formData.minCustomers),
      maxCustomers: parseInt(formData.maxCustomers),
      avgCookies: parseFloat(formData.avgCookies),
      hourly_sales: hourly_sales,
    };
  
    props.onCreate(standData);
    event.target.reset();
    setFormData({ location: '', minCustomers: '', maxCustomers: '', avgCookies: '' }); 
  }

  return (
    <div className="flex justify-center my-8">
      <form onSubmit={handleSubmit} className="flex flex-col w-2/3 gap-4 p-4 mx-auto bg-green-300 rounded-md">
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
            <button type="submit" className="w-full px-5 py-2 mt-4 bg-green-500 hover:bg-green-600 sm:w-auto sm:mt-0">Create</button>
          </div>
        </div>
      </form>
    </div>
  );
}

