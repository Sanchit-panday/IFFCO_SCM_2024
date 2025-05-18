import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Truck, Calendar, Map, Route } from 'lucide-react';
import { deliveryData, vehicles } from '@/data/mockData';

const Logistics: React.FC = () => {
  return (
    <Layout requiredRole="logistics">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Logistics Management</h1>
        <p className="text-muted-foreground">
          Manage transportation and delivery of products
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {deliveryData.filter(d => d.status === 'In Transit').length}
            </div>
            <p className="text-xs text-muted-foreground">Currently in transit</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Vehicle Fleet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vehicles.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {vehicles.filter(v => v.currentStatus === 'Available').length} available
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {deliveryData.filter(d => d.status === 'Scheduled').length}
            </div>
            <p className="text-xs text-muted-foreground">Pending dispatch</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {deliveryData.filter(d => d.status === 'Delivered').length}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="deliveries" className="space-y-4">
        <TabsList>
          <TabsTrigger value="deliveries">
            <Truck className="h-4 w-4 mr-2" />
            Deliveries
          </TabsTrigger>
          <TabsTrigger value="vehicles">
            <Truck className="h-4 w-4 mr-2" />
            Vehicles
          </TabsTrigger>
          <TabsTrigger value="schedule">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </TabsTrigger>
          <TabsTrigger value="routes">
            <Map className="h-4 w-4 mr-2" />
            Routes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="deliveries">
          <Card>
            <CardHeader>
              <CardTitle>Active Deliveries</CardTitle>
              <CardDescription>
                Manage ongoing deliveries and their statuses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Delivery ID</TableHead>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Departure</TableHead>
                      <TableHead>ETA</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deliveryData.map((delivery) => (
                      <TableRow key={delivery.id}>
                        <TableCell className="font-medium">{delivery.id}</TableCell>
                        <TableCell>{delivery.orderId}</TableCell>
                        <TableCell>{delivery.vehicle}</TableCell>
                        <TableCell>{delivery.driver}</TableCell>
                        <TableCell>
                          <Badge variant={
                            delivery.status === 'Delivered' ? "outline" :
                            delivery.status === 'In Transit' ? "secondary" :
                            delivery.status === 'Scheduled' ? "default" : "outline"
                          }>
                            {delivery.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{delivery.departureTime}</TableCell>
                        <TableCell>{delivery.deliveryTime}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            <Route className="h-4 w-4 mr-2" />
                            Track
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vehicles">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Vehicle Fleet</CardTitle>
                  <CardDescription>
                    Manage transportation vehicles and their status
                  </CardDescription>
                </div>
                <Button>Add Vehicle</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Registration</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vehicles.map((vehicle) => (
                      <TableRow key={vehicle.id}>
                        <TableCell className="font-medium">{vehicle.id}</TableCell>
                        <TableCell>{vehicle.type}</TableCell>
                        <TableCell>{vehicle.capacity} {vehicle.unit}</TableCell>
                        <TableCell>{vehicle.registrationNumber}</TableCell>
                        <TableCell>
                          <Badge variant={
                            vehicle.currentStatus === 'In Transit' ? "default" :
                            vehicle.currentStatus === 'Available' ? "secondary" :
                            vehicle.currentStatus === 'Maintenance' ? "destructive" : "outline"
                          }>
                            {vehicle.currentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>{vehicle.location}</TableCell>
                        <TableCell>{vehicle.driver}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Schedule</CardTitle>
              <CardDescription>
                Weekly delivery planning and scheduling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md bg-gray-50">
                <div className="text-center">
                  <Calendar className="h-16 w-16 text-muted-foreground mx-auto" />
                  <p className="mt-2 text-lg font-medium">Calendar View</p>
                  <p className="text-sm text-muted-foreground">
                    Delivery schedule calendar would be displayed here
                  </p>
                  <Button className="mt-4" variant="outline">View Full Calendar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routes">
          <Card>
            <CardHeader>
              <CardTitle>Route Optimization</CardTitle>
              <CardDescription>
                Plan and optimize delivery routes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md bg-gray-50">
                <div className="text-center">
                  <Map className="h-16 w-16 text-muted-foreground mx-auto" />
                  <p className="mt-2 text-lg font-medium">Map View</p>
                  <p className="text-sm text-muted-foreground">
                    Interactive route planning map would be displayed here
                  </p>
                  <Button className="mt-4" variant="outline">Open Route Planner</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Logistics;