import Link from 'next/link';
import NavLinks from './nav-links';
import ProjectLinks from './project-links';
import { AddProject } from './add-project';

import { PowerIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  return (
    <div className="display:flex">
      {/* <div> */}
      {/* <Link
        className="mb-2 flex h-20 items-end justify-center border-radius:5px bg-blue-600 p-4 md:h-40 align-items:center display:flex justify-contents: center"
        href="/projects"
      >
        <div className="w-16 text-white ">
          <PowerIcon />
          <div>Datamind</div>
        </div>
      </Link> */}
      {/* <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2"> */}
      <div >
        {/* <NavLinks /> */}
        {/* <ProjectLinks /> */}
        <AddProject />
        {/* <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block">
           */}
           <div>
        </div>
        
        {/* <form>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form> */}
      </div>
    </div>
  );
}
