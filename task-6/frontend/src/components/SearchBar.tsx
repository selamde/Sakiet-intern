import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown, RotateCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  minAge: string;
  maxAge: string;
  onMinAgeChange: (value: string) => void;
  onMaxAgeChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  onResetFilters: () => void;
  totalResults: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  minAge,
  maxAge,
  onMinAgeChange,
  onMaxAgeChange,
  sortBy,
  onSortChange,
  onResetFilters,
  totalResults,
}) => {
  const activeFiltersCount =
    (searchTerm ? 1 : 0) +
    (minAge ? 1 : 0) +
    (maxAge ? 1 : 0) +
    (sortBy !== 'createdAt' ? 1 : 0);

  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm space-y-3">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search users by name or email address..."
            className="pl-9 pr-9 h-10 text-xs sm:text-sm bg-background"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Min Age Input */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-muted-foreground hidden sm:inline">Age:</span>
            <Input
              type="number"
              placeholder="Min"
              value={minAge}
              onChange={(e) => onMinAgeChange(e.target.value)}
              className="w-20 h-10 text-xs px-2.5 text-center"
              min="1"
              max="120"
            />
            <span className="text-xs text-muted-foreground">-</span>
            <Input
              type="number"
              placeholder="Max"
              value={maxAge}
              onChange={(e) => onMaxAgeChange(e.target.value)}
              className="w-20 h-10 text-xs px-2.5 text-center"
              min="1"
              max="120"
            />
          </div>

          {/* Sort Selector */}
          <div className="w-44">
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="h-10 text-xs">
                <div className="flex items-center gap-1.5 truncate">
                  <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                  <SelectValue placeholder="Sort records" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt" className="text-xs">Newest Added</SelectItem>
                <SelectItem value="name" className="text-xs">Name (A - Z)</SelectItem>
                <SelectItem value="age" className="text-xs">Age (Ascending)</SelectItem>
                <SelectItem value="email" className="text-xs">Email (A - Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reset Filters Button */}
          {activeFiltersCount > 0 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onResetFilters}
              className="h-10 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
              <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0 h-4">
                {activeFiltersCount}
              </Badge>
            </Button>
          )}

        </div>

      </div>

      {/* Active criteria pill line */}
      <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t">
        <span>
          Showing <strong className="text-foreground">{totalResults}</strong> matching records
        </span>
        {activeFiltersCount > 0 && (
          <span className="text-[11px] text-primary font-medium">
            Active filters applied
          </span>
        )}
      </div>

    </div>
  );
};

export default SearchBar;
