import Link from 'next/link';
import NavLinks from './nav-links';
import ProjectLinks from './project-links';
import { AddProject } from './add-project';

import { PowerIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  return (
    <div className="display:flex">

      <div >
        <AddProject />
           <div>
        </div>
      </div>
    </div>
  );
}
