import { Home, Search, Library, Sparkles } from "lucide-react";

export default function Sidebar() {
    return (
        <aside className="w-60 bg-zinc-950 border-r border-white/10 p-6 hidden md:block">
            <div className="flex items-center gap-2 mb-10">
                <Sparkles className="text-purple-500" />
                <span className="font-bold text-lg">Moodify</span>
            </div>

            <nav className="space-y-4 text-zinc-400">
                <SidebarItem icon={<Home size={18} />} label="Home" />
                <SidebarItem icon={<Search size={18} />} label="Search" />
                <SidebarItem icon={<Library size={18} />} label="Your Library" />
            </nav>
        </aside>
    );
}

function SidebarItem({ icon, label }) {
    return (
        <div className="flex items-center gap-3 cursor-pointer hover:text-white transition">
            {icon}
            <span>{label}</span>
        </div>
    );
}
