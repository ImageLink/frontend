'use client';

import { useState, useEffect } from 'react';
import { AdminService } from '@/lib/admin/services';
import { useToast } from '@/components/ui/use-toast';

export function useAdmin() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [listings, setListings] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [
        statsResult,
        usersResult,
        listingsResult,
        reportsResult,
        messagesResult,
        categoriesResult,
      ] = await Promise.all([
        AdminService.getStats(),
        AdminService.getUsers(),
        AdminService.getListings(),
        AdminService.getReports(),
        AdminService.getMessages(),
        AdminService.getCategories(),
      ]);

      if (statsResult.error) throw statsResult.error;
      if (usersResult.error) throw usersResult.error;
      if (listingsResult.error) throw listingsResult.error;
      if (reportsResult.error) throw reportsResult.error;
      if (messagesResult.error) throw messagesResult.error;
      if (categoriesResult.error) throw categoriesResult.error;

      setStats(statsResult.stats);
      setUsers(usersResult.users);
      setListings(listingsResult.listings);
      setReports(reportsResult.reports);
      setMessages(messagesResult.messages);
      setCategories(categoriesResult.categories);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: string, updates: any) => {
    const result = await AdminService.updateUser(id, updates);
    if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive",
      });
      return false;
    }
    
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...result.user } : user
    ));
    
    toast({
      title: "Success",
      description: "User updated successfully",
    });
    return true;
  };

  const updateListing = async (id: string, updates: any) => {
    const result = await AdminService.updateListing(id, updates);
    if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive",
      });
      return false;
    }
    
    setListings(prev => prev.map(listing => 
      listing.id === id ? { ...listing, ...result.listing } : listing
    ));
    
    toast({
      title: "Success",
      description: "Listing updated successfully",
    });
    return true;
  };

  const deleteListing = async (id: string) => {
    const result = await AdminService.deleteListing(id);
    if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive",
      });
      return false;
    }
    
    setListings(prev => prev.filter(listing => listing.id !== id));
    
    toast({
      title: "Success",
      description: "Listing deleted successfully",
    });
    return true;
  };

  const updateReport = async (id: string, updates: any) => {
    const result = await AdminService.updateReport(id, updates);
    if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive",
      });
      return false;
    }
    
    setReports(prev => prev.map(report => 
      report.id === id ? { ...report, ...result.report } : report
    ));
    
    toast({
      title: "Success",
      description: "Report updated successfully",
    });
    return true;
  };

  const replyToMessage = async (messageId: string, content: string) => {
    const result = await AdminService.replyToMessage(messageId, content);
    if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive",
      });
      return false;
    }
    
    setMessages(prev => prev.map(message => 
      message.id === messageId ? { ...message, status: 'replied' } : message
    ));
    
    toast({
      title: "Success",
      description: "Reply sent successfully",
    });
    return true;
  };

  const createCategory = async (categoryData: any) => {
    const result = await AdminService.createCategory(categoryData);
    if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive",
      });
      return false;
    }
    
    setCategories(prev => [...prev, result.category]);
    
    toast({
      title: "Success",
      description: "Category created successfully",
    });
    return true;
  };

  const updateCategory = async (id: string, updates: any) => {
    const result = await AdminService.updateCategory(id, updates);
    if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive",
      });
      return false;
    }
    
    setCategories(prev => prev.map(category => 
      category.id === id ? { ...category, ...result.category } : category
    ));
    
    toast({
      title: "Success",
      description: "Category updated successfully",
    });
    return true;
  };

  const deleteCategory = async (id: string) => {
    const result = await AdminService.deleteCategory(id);
    if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive",
      });
      return false;
    }
    
    setCategories(prev => prev.filter(category => category.id !== id));
    
    toast({
      title: "Success",
      description: "Category deleted successfully",
    });
    return true;
  };

  return {
    loading,
    stats,
    users,
    listings,
    reports,
    messages,
    categories,
    updateUser,
    updateListing,
    deleteListing,
    updateReport,
    replyToMessage,
    createCategory,
    updateCategory,
    deleteCategory,
    refreshData: fetchDashboardData,
  };
}