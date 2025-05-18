import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, LineChart, ResponsiveContainer, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Package, ShoppingCart, TrendingUp, AlertTriangle, Truck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { alertsData, salesData, inventoryData, orderData, demandForecastData } from '@/data/mockData';

const DashboardCard: React.FC<{
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
}> = ({ title, value, description, icon, trend, trendDirection }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          <div className="bg-iffco-blue/10 p-3 rounded-full">
            {icon}
          </div>
        </div>
        
        {trend && (
          <div className="mt-3 flex items-center text-xs">
            <span className={
              trendDirection === 'up' 
                ? 'text-green-500' 
                : trendDirection === 'down' 
                ? 'text-red-500' 
                : 'text-gray-500'
            }>
              {trend}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  const renderRoleSpecificContent = () => {
    switch (user?.role) {
      case 'admin':
        return adminDashboard();
      case 'production':
        return productionDashboard();
      case 'distribution':
        return distributionDashboard();
      case 'retailer':
        return retailerDashboard();
      case 'logistics':
        return logisticsDashboard();
      default:
        return <p>Unknown role</p>;
    }
  };
  
  const adminDashboard = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <DashboardCard 
          title="Total Inventory" 
          value="37,700 MT" 
          description="Across all distribution centers" 
          icon={<Package className="h-5 w-5 text-iffco-blue" />} 
          trend="+5% from last month" 
          trendDirection="up" 
        />
        <DashboardCard 
          title="Orders This Month" 
          value="132" 
          description="15 pending approval" 
          icon={<ShoppingCart className="h-5 w-5 text-iffco-blue" />} 
          trend="+12% from last month" 
          trendDirection="up" 
        />
        <DashboardCard 
          title="Sales Growth" 
          value="₹42.6M" 
          description="Revenue this quarter" 
          icon={<TrendingUp className="h-5 w-5 text-iffco-blue" />} 
          trend="+8% from last quarter" 
          trendDirection="up" 
        />
        <DashboardCard 
          title="Active Alerts" 
          value="7" 
          description="2 high priority" 
          icon={<AlertTriangle className="h-5 w-5 text-iffco-blue" />} 
          trend="-3 from yesterday" 
          trendDirection="down" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
            <CardDescription>Monthly sales volume in metric tons</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#0063A5" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Demand Forecast</CardTitle>
            <CardDescription>Projected demand for next 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={demandForecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="urea" fill="#0063A5" />
                <Bar dataKey="dap" fill="#3498db" />
                <Bar dataKey="npk" fill="#2ECC71" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-4">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>System alerts from the last 24 hours</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alertsData.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md">
                <Badge variant={
                  alert.severity === 'high' ? "destructive" : 
                  alert.severity === 'medium' ? "outline" : "secondary"
                }>
                  {alert.severity}
                </Badge>
                <div>
                  <p className="font-medium">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );

  const productionDashboard = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard 
          title="Production Units" 
          value="5 Active" 
          description="All units operational" 
          icon={<Package className="h-5 w-5 text-iffco-blue" />} 
        />
        <DashboardCard 
          title="Current Production" 
          value="8,500 MT" 
          description="Daily production volume" 
          icon={<TrendingUp className="h-5 w-5 text-iffco-blue" />} 
          trend="+4% from yesterday" 
          trendDirection="up" 
        />
        <DashboardCard 
          title="Production Alerts" 
          value="2" 
          description="1 high priority" 
          icon={<AlertTriangle className="h-5 w-5 text-iffco-blue" />} 
        />
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Current Inventory Levels</CardTitle>
          <CardDescription>Inventory by production unit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inventoryData.map((item) => (
              <div key={item.id} className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{item.quantity} {item.unit}</p>
                    <p className="text-sm text-muted-foreground">
                      Threshold: {item.threshold} {item.unit}
                    </p>
                  </div>
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full">
                  <div 
                    className={`h-2 rounded-full ${
                      item.quantity < item.threshold 
                        ? 'bg-red-500' 
                        : item.quantity < item.threshold * 1.5 
                        ? 'bg-yellow-500' 
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(100, (item.quantity / (item.threshold * 3)) * 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );

  const distributionDashboard = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard 
          title="Distribution Centers" 
          value="5 Active" 
          description="All centers operational" 
          icon={<Package className="h-5 w-5 text-iffco-blue" />} 
        />
        <DashboardCard 
          title="Pending Orders" 
          value="24" 
          description="8 high priority" 
          icon={<ShoppingCart className="h-5 w-5 text-iffco-blue" />} 
        />
        <DashboardCard 
          title="Outgoing Shipments" 
          value="18" 
          description="Today's scheduled deliveries" 
          icon={<Truck className="h-5 w-5 text-iffco-blue" />} 
        />
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest order activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orderData.map((order) => (
              <div key={order.id} className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm">{order.product} - {order.quantity} {order.unit}</p>
                    <p className="text-xs text-muted-foreground">{order.retailer}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={
                      order.status === 'Delivered' ? "outline" :
                      order.status === 'In Transit' ? "secondary" :
                      order.status === 'Processing' ? "default" :
                      order.status === 'Confirmed' ? "secondary" : "outline"
                    }>
                      {order.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">Due: {order.deliveryDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );

  const retailerDashboard = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard 
          title="My Orders" 
          value="5 Active" 
          description="2 pending, 3 in transit" 
          icon={<ShoppingCart className="h-5 w-5 text-iffco-blue" />} 
        />
        <DashboardCard 
          title="Next Delivery" 
          value="May 18, 2025" 
          description="DAP - 300 Metric Tons" 
          icon={<Truck className="h-5 w-5 text-iffco-blue" />} 
        />
        <DashboardCard 
          title="Available Products" 
          value="5 Types" 
          description="All fertilizer categories" 
          icon={<Package className="h-5 w-5 text-iffco-blue" />} 
        />
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>My Order History</CardTitle>
          <CardDescription>Past and active orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orderData
              .filter(order => order.retailer === 'Green Growth Inc')
              .map((order) => (
                <div key={order.id} className="border-b pb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm">{order.product} - {order.quantity} {order.unit}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={
                        order.status === 'Delivered' ? "outline" :
                        order.status === 'In Transit' ? "secondary" :
                        order.status === 'Processing' ? "default" :
                        order.status === 'Confirmed' ? "secondary" : "outline"
                      }>
                        {order.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">Due: {order.deliveryDate}</p>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );

  const logisticsDashboard = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard 
          title="Active Deliveries" 
          value="14" 
          description="5 high priority" 
          icon={<Truck className="h-5 w-5 text-iffco-blue" />} 
        />
        <DashboardCard 
          title="Vehicle Fleet" 
          value="28 Active" 
          description="3 in maintenance" 
          icon={<Truck className="h-5 w-5 text-iffco-blue" />} 
        />
        <DashboardCard 
          title="Average Delivery Time" 
          value="1.4 Days" 
          description="15% faster than last month" 
          icon={<TrendingUp className="h-5 w-5 text-iffco-blue" />} 
          trend="+15% efficiency" 
          trendDirection="up" 
        />
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Active Deliveries</CardTitle>
          <CardDescription>Current shipments in transit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...orderData]
              .filter(order => order.status === 'In Transit')
              .map((order) => (
                <div key={order.id} className="border-b pb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm">{order.product} - {order.quantity} {order.unit}</p>
                      <p className="text-xs text-muted-foreground">To: {order.retailer} ({order.location})</p>
                    </div>
                    <div className="text-right">
                      <Badge>In Transit</Badge>
                      <p className="text-xs text-muted-foreground mt-1">Due: {order.deliveryDate}</p>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
        <p className="text-muted-foreground">
          {user?.role === 'admin' ? 'Administrator Dashboard Overview' :
           user?.role === 'production' ? `Production Management - ${user?.location}` :
           user?.role === 'distribution' ? `Distribution Center - ${user?.location}` :
           user?.role === 'retailer' ? `Retailer Dashboard - ${user?.location}` :
           `Logistics Management Dashboard`}
        </p>
      </div>
      
      {renderRoleSpecificContent()}
    </Layout>
  );
};

export default Dashboard;