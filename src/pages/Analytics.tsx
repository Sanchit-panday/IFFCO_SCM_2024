import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, BarChart, ResponsiveContainer, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { BarChart2, TrendingUp, Truck, Package } from 'lucide-react';
import { salesData, productionData, demandForecastData } from '@/data/mockData';

const Analytics: React.FC = () => {
  return (
    <Layout requiredRole="admin">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Analytics & Reporting</h1>
        <p className="text-muted-foreground">
          Monitor key performance indicators and trends
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sales Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold">+15.8%</div>
              <div className="text-xs text-green-500">↑ 2.3%</div>
            </div>
            <p className="text-xs text-muted-foreground">Compared to last quarter</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inventory Turnover</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold">4.2</div>
              <div className="text-xs text-green-500">↑ 0.3</div>
            </div>
            <p className="text-xs text-muted-foreground">Times per quarter</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Delivery Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold">1.4 days</div>
              <div className="text-xs text-green-500">↓ 0.2</div>
            </div>
            <p className="text-xs text-muted-foreground">Average delivery time</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Order Fulfillment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold">98.5%</div>
              <div className="text-xs text-green-500">↑ 1.2%</div>
            </div>
            <p className="text-xs text-muted-foreground">On-time, in-full rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales">
            <TrendingUp className="h-4 w-4 mr-2" />
            Sales Analytics
          </TabsTrigger>
          <TabsTrigger value="production">
            <Package className="h-4 w-4 mr-2" />
            Production Metrics
          </TabsTrigger>
          <TabsTrigger value="forecast">
            <BarChart2 className="h-4 w-4 mr-2" />
            Demand Forecast
          </TabsTrigger>
          <TabsTrigger value="logistics">
            <Truck className="h-4 w-4 mr-2" />
            Logistics Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Sales Trend</CardTitle>
                <CardDescription>Monthly sales volume in metric tons</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#0063A5" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
                <CardDescription>Product sales distribution by volume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Urea', value: 42 },
                      { name: 'DAP', value: 28 },
                      { name: 'NPK', value: 15 },
                      { name: 'MOP', value: 10 },
                      { name: 'SSP', value: 5 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#0063A5" name="Sales %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Regional Sales Distribution</CardTitle>
                <CardDescription>Sales by region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'North', value: 35 },
                      { name: 'South', value: 25 },
                      { name: 'East', value: 20 },
                      { name: 'West', value: 20 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#2ECC71" name="Sales %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="production">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Production Performance</CardTitle>
                <CardDescription>Target vs. Actual Production (May 2025)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={productionData} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="product" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="target" fill="#8884d8" name="Target (MT)" />
                    <Bar dataKey="actual" fill="#82ca9d" name="Actual (MT)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Production Efficiency</CardTitle>
                <CardDescription>Efficiency metrics by production unit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Aonla', value: 94 },
                      { name: 'Phulpur', value: 92 },
                      { name: 'Kalol', value: 88 },
                      { name: 'Kandla', value: 91 },
                      { name: 'Paradeep', value: 89 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#0063A5" name="Efficiency %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Production Cost Analysis</CardTitle>
                <CardDescription>Cost breakdown per metric ton</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Urea', value: 12000 },
                      { name: 'DAP', value: 18500 },
                      { name: 'NPK', value: 16000 },
                      { name: 'MOP', value: 13500 },
                      { name: 'SSP', value: 9000 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#2ECC71" name="Cost (₹/MT)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="forecast">
          <Card>
            <CardHeader>
              <CardTitle>Demand Forecast (6-Month)</CardTitle>
              <CardDescription>Projected demand for fertilizer products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={demandForecastData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="urea" stroke="#0063A5" name="Urea" strokeWidth={2} />
                    <Line type="monotone" dataKey="dap" stroke="#3498db" name="DAP" />
                    <Line type="monotone" dataKey="npk" stroke="#2ECC71" name="NPK" />
                    <Line type="monotone" dataKey="mop" stroke="#f39c12" name="MOP" />
                    <Line type="monotone" dataKey="ssp" stroke="#9b59b6" name="SSP" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Seasonal Demand Patterns</CardTitle>
                <CardDescription>Quarterly fertilizer demand by year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { quarter: 'Q1', '2023': 14000, '2024': 16500, '2025': 18000 },
                      { quarter: 'Q2', '2023': 22000, '2024': 24500, '2025': 27000 },
                      { quarter: 'Q3', '2023': 28000, '2024': 29500, '2025': 32000 },
                      { quarter: 'Q4', '2023': 18000, '2024': 19500, '2025': 21000 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quarter" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="2023" fill="#8884d8" name="2023 (MT)" />
                      <Bar dataKey="2024" fill="#82ca9d" name="2024 (MT)" />
                      <Bar dataKey="2025" fill="#ffc658" name="2025 (MT)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Forecast Accuracy</CardTitle>
                <CardDescription>Accuracy of previous demand forecasts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { month: 'Jan', forecast: 14000, actual: 14200 },
                      { month: 'Feb', forecast: 13000, actual: 12800 },
                      { month: 'Mar', forecast: 15000, actual: 15300 },
                      { month: 'Apr', forecast: 14500, actual: 14100 },
                      { month: 'May', forecast: 16000, actual: 16200 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="forecast" stroke="#0063A5" name="Forecast (MT)" strokeWidth={2} />
                      <Line type="monotone" dataKey="actual" stroke="#2ECC71" name="Actual (MT)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="logistics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Logistics Performance</CardTitle>
                <CardDescription>Delivery time and efficiency metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { month: 'Jan', deliveryTime: 1.8, fuelCost: 22 },
                      { month: 'Feb', deliveryTime: 1.7, fuelCost: 21 },
                      { month: 'Mar', deliveryTime: 1.6, fuelCost: 23 },
                      { month: 'Apr', deliveryTime: 1.5, fuelCost: 20 },
                      { month: 'May', deliveryTime: 1.4, fuelCost: 19 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="deliveryTime" stroke="#0063A5" name="Avg. Delivery Time (Days)" strokeWidth={2} />
                      <Line yAxisId="right" type="monotone" dataKey="fuelCost" stroke="#e74c3c" name="Fuel Cost (₹/km)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Utilization</CardTitle>
                <CardDescription>Fleet capacity utilization rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { type: 'Small Truck', rate: 82 },
                      { type: 'Medium Truck', rate: 88 },
                      { type: 'Large Truck', rate: 75 },
                      { type: 'Tanker', rate: 90 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="rate" fill="#0063A5" name="Utilization %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Delivery Performance by Region</CardTitle>
                <CardDescription>On-time delivery performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { region: 'North', onTime: 97, delayed: 3 },
                      { region: 'South', onTime: 94, delayed: 6 },
                      { region: 'East', onTime: 92, delayed: 8 },
                      { region: 'West', onTime: 96, delayed: 4 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="region" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="onTime" stackId="a" fill="#2ECC71" name="On-Time %" />
                      <Bar dataKey="delayed" stackId="a" fill="#e74c3c" name="Delayed %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Analytics;