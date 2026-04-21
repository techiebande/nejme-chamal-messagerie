'use client';

import React from 'react';
import { colors, radius, spacing, typography } from '@/app/config/design-tokens';

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

interface TableHeaderProps extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
  children: React.ReactNode;
}

interface TableBodyProps extends React.TBodyHTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

interface TableRowProps extends React.TrHTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableDataCellElement> {
  children: React.ReactNode;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className = '', children, ...props }, ref) => {
    const tableStyle: React.CSSProperties = {
      width: '100%',
      borderCollapse: 'collapse',
      borderSpacing: 0,
    };

    return (
      <table ref={ref} style={tableStyle} className={className} {...props}>
        {children}
      </table>
    );
  }
);

Table.displayName = 'Table';

export const TableHeader = React.forwardRef<HTMLTableHeaderCellElement, TableHeaderProps>(
  ({ className = '', children, ...props }, ref) => {
    const headerStyle: React.CSSProperties = {
      padding: spacing[3],
      fontSize: typography.fontSize.small.size,
      fontWeight: 600,
      color: colors.textSecondary,
      backgroundColor: colors.surface,
      borderBottom: `1px solid ${colors.border}`,
      textAlign: 'left',
    };

    return (
      <th ref={ref} style={headerStyle} className={className} {...props}>
        {children}
      </th>
    );
  }
);

TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <tbody ref={ref} className={className} {...props}>
        {children}
      </tbody>
    );
  }
);

TableBody.displayName = 'TableBody';

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className = '', children, ...props }, ref) => {
    const rowStyle: React.CSSProperties = {
      borderBottom: `1px solid ${colors.border}`,
      transition: 'background-color 200ms ease-in-out',
    };

    const hoverStyle: React.CSSProperties = {
      ...rowStyle,
    };

    return (
      <tr
        ref={ref}
        style={hoverStyle}
        className={className}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLTableRowElement).style.backgroundColor = colors.surfaceAlt;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLTableRowElement).style.backgroundColor = 'transparent';
        }}
        {...props}
      >
        {children}
      </tr>
    );
  }
);

TableRow.displayName = 'TableRow';

export const TableCell = React.forwardRef<HTMLTableDataCellElement, TableCellProps>(
  ({ className = '', children, ...props }, ref) => {
    const cellStyle: React.CSSProperties = {
      padding: spacing[3],
      fontSize: typography.fontSize.body.size,
      color: colors.textPrimary,
    };

    return (
      <td ref={ref} style={cellStyle} className={className} {...props}>
        {children}
      </td>
    );
  }
);

TableCell.displayName = 'TableCell';
