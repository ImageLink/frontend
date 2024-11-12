'use client';

import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, CheckCircle, XCircle, BadgeCheck } from 'lucide-react';

interface ListingRowProps {
  listing: any;
  onEdit: (listing: any) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
}

export function ListingRow({ listing, onEdit, onDelete, onStatusChange }: ListingRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          {listing.domain}
          {listing.isPremium && (
            <BadgeCheck className="h-4 w-4 text-blue-500" />
          )}
        </div>
      </TableCell>
      <TableCell>{listing.owner}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>DA: {listing.da}</div>
          <div>DR: {listing.dr}</div>
        </div>
      </TableCell>
      <TableCell>{listing.traffic}</TableCell>
      <TableCell>
        <Badge
          variant={
            listing.status === 'active'
              ? 'default'
              : listing.status === 'rejected'
              ? 'destructive'
              : 'secondary'
          }
        >
          {listing.status}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>${listing.price}</div>
          {!listing.showPrice && (
            <Badge variant="secondary">Hidden</Badge>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {listing.categories?.slice(0, 2).map((cat: string) => (
            <Badge key={cat} variant="outline">{cat}</Badge>
          ))}
          {listing.categories?.length > 2 && (
            <Badge variant="outline">+{listing.categories.length - 2}</Badge>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onEdit(listing)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          {listing.status === 'pending' && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="text-green-500 hover:text-green-600"
                onClick={() => onStatusChange(listing.id, 'active')}
              >
                <CheckCircle className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="text-red-500 hover:text-red-600"
                onClick={() => onStatusChange(listing.id, 'rejected')}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </>
          )}
          <Button
            variant="outline"
            size="icon"
            className="text-destructive"
            onClick={() => onDelete(listing.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}