import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSidebar } from '@/contexts/SidebarContext';
import { cn } from '@/lib/utils';
import {
  Home,
  Package,
  ShoppingCart,
  BarChart,
  Truck,
  Users,
  Settings,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MenuItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  roles: string[];
}

const MenuItem: React.FC<MenuItemProps> = ({ to, icon: Icon, label, roles }) => {
  const { user } = useAuth();
  
  if (!user || !roles.includes(user.role)) {
    return null;
  }
  
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
          isActive 
            ? "bg-iffco-blue text-white" 
            : "hover:bg-iffco-lightblue/10 text-gray-700 hover:text-iffco-blue"
        )
      }
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </NavLink>
  );
};

export const Sidebar: React.FC = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  const { user } = useAuth();

  if (!user) return null;

  return (
    <aside 
      className={cn(
        "bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-20 flex flex-col",
        isOpen ? "w-64" : "w-0 md:w-16"
      )}
    >
      <div className="flex items-center justify-between p-4">
        <div className={cn("flex items-center", !isOpen && "md:hidden")}>
          <img 
            src="/assets/IFFCO_logo.png" 
            alt="IFFCO Logo" 
            className="h-8 w-auto mr-2" 
          />
          <span className={cn("font-bold text-lg text-iffco-blue transition-opacity", 
            isOpen ? "opacity-100" : "opacity-0"
          )}>
            IFFCO SCM
          </span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className={cn("hidden md:flex", !isOpen && "rotate-180")}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="p-2 flex-1 overflow-y-auto">
        <nav className="space-y-1">
          <MenuItem to="/dashboard" icon={Home} label="Dashboard" roles={['admin', 'production', 'distribution', 'retailer', 'logistics']} />
          <MenuItem to="/inventory" icon={Package} label="Inventory" roles={['admin', 'production', 'distribution']} />
          <MenuItem to="/orders" icon={ShoppingCart} label="Orders" roles={['admin', 'production', 'distribution', 'retailer']} />
          <MenuItem to="/logistics" icon={Truck} label="Logistics" roles={['admin', 'logistics', 'distribution']} />
          <MenuItem to="/analytics" icon={BarChart} label="Analytics" roles={['admin', 'production', 'distribution']} />
          <MenuItem to="/users" icon={Users} label="User Management" roles={['admin']} />
          <MenuItem to="/settings" icon={Settings} label="Settings" roles={['admin', 'production', 'distribution', 'retailer', 'logistics']} />
        </nav>
      </div>
      
      <div className="mt-auto p-4 border-t border-gray-200">
        <div className={cn("flex items-center gap-3", !isOpen && "md:hidden")}>
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className={cn("transition-opacity", isOpen ? "opacity-100" : "opacity-0")}>
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';