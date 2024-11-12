'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Edit2, Ban, CheckCircle, Key } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  whatsapp?: string;
  telegram?: string;
  status: 'Active' | 'Suspended';
  joinDate: string;
}

interface PasswordChangeData {
  userId: number;
  username: string;
}

export function UsersTable() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [changingPassword, setChangingPassword] = useState<PasswordChangeData | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const users: User[] = [
    {
      id: 1,
      username: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      whatsapp: '+1234567890',
      telegram: '@johndoe',
      status: 'Active',
      joinDate: '2024-01-15',
    },
    {
      id: 2,
      username: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1987654321',
      status: 'Active',
      joinDate: '2024-02-01',
    },
    {
      id: 3,
      username: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1122334455',
      telegram: '@mikej',
      status: 'Suspended',
      joinDate: '2024-01-20',
    },
  ];

  const handleStatusChange = (userId: number, newStatus: 'Active' | 'Suspended') => {
    toast({
      title: 'User Status Updated',
      description: `User status has been changed to ${newStatus}.`,
    });
  };

  const handleSaveUser = (formData: Partial<User>) => {
    toast({
      title: 'User Updated',
      description: 'User information has been updated successfully.',
    });
    setEditingUser(null);
  };

  const handlePasswordChange = () => {
    if (!newPassword || !confirmPassword) {
      toast({
        title: 'Validation Error',
        description: 'Please enter both password fields.',
        variant: 'destructive',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: 'Validation Error',
        description: 'Passwords do not match.',
        variant: 'destructive',
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: 'Validation Error',
        description: 'Password must be at least 8 characters long.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description: `Password updated for user ${changingPassword?.username}`,
    });
    setChangingPassword(null);
    setNewPassword('');
    setConfirmPassword('');
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Users Management</h2>
          <p className="text-muted-foreground">Manage user accounts and details</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9 w-[300px]"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Social</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {user.whatsapp && (
                      <div className="text-sm">WhatsApp: {user.whatsapp}</div>
                    )}
                    {user.telegram && (
                      <div className="text-sm">Telegram: {user.telegram}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={user.status === 'Active' ? "default" : "secondary"}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setEditingUser(user)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setChangingPassword({ userId: user.id, username: user.username })}
                    >
                      <Key className="h-4 w-4" />
                    </Button>
                    {user.status === 'Active' ? (
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-destructive"
                        onClick={() => handleStatusChange(user.id, 'Suspended')}
                      >
                        <Ban className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-green-500"
                        onClick={() => handleStatusChange(user.id, 'Active')}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit User Dialog */}
      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User Details</DialogTitle>
          </DialogHeader>
          {editingUser && (
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              handleSaveUser(editingUser);
            }}>
              <div className="space-y-2">
                <Label>Username</Label>
                <Input
                  value={editingUser.username}
                  onChange={(e) => setEditingUser({
                    ...editingUser,
                    username: e.target.value
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({
                    ...editingUser,
                    email: e.target.value
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  type="tel"
                  value={editingUser.phone}
                  onChange={(e) => setEditingUser({
                    ...editingUser,
                    phone: e.target.value
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label>WhatsApp (Optional)</Label>
                <Input
                  type="tel"
                  value={editingUser.whatsapp || ''}
                  onChange={(e) => setEditingUser({
                    ...editingUser,
                    whatsapp: e.target.value
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label>Telegram (Optional)</Label>
                <Input
                  value={editingUser.telegram || ''}
                  onChange={(e) => setEditingUser({
                    ...editingUser,
                    telegram: e.target.value
                  })}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingUser(null)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={!!changingPassword} onOpenChange={() => {
        setChangingPassword(null);
        setNewPassword('');
        setConfirmPassword('');
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password for {changingPassword?.username}</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            handlePasswordChange();
          }}>
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>

            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setChangingPassword(null);
                  setNewPassword('');
                  setConfirmPassword('');
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Update Password</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}