'use client';

import {
	LayoutDashboard,
	FileText,
	FilePlus,
	Settings,
	LogOut,
} from 'lucide-react';

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
type AppSidebarProps = {
	onSignOut: () => void;
};

export function AppSidebar({ onSignOut }: AppSidebarProps) {
	const items = [
		{
			title: 'Dashboard',
			url: '/dashboard',
			icon: LayoutDashboard,
		},
		{
			title: 'My Documents',
			url: '#',
			icon: FileText,
		},
		{
			title: 'New Job Application',
			url: '/applications/new',
			icon: FilePlus,
		},
		{
			title: 'Settings',
			url: '#',
			icon: Settings,
		},
		{
			title: 'Sign Out',
			icon: LogOut,
			onClick: onSignOut,
		},
	];

	return (
		<Sidebar
			className="bg-white min-h-screen text-white"
			collapsible="none"
		>
			<p className="text-4xl text-black text-left font-semibold pt-8 pb-3 pl-5">
				Stack AI
			</p>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										{item.onClick ? (
											<button
												onClick={item.onClick}
												className="flex items-center gap-2 w-full text-black text-left hover:bg-skyblue-900 hover:text-white transition-colors duration-200 ease-in-out"
											>
												<item.icon />
												<span>{item.title}</span>
											</button>
										) : (
											<a
												href={item.url}
												className="flex items-center text-black gap-2 w-full hover:bg-skyblue-900 hover:text-white transition-colors duration-200 ease-in-out"
											>
												<item.icon />
												<span>{item.title}</span>
											</a>
										)}
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
