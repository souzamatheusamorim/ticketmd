"use client"

import { ColumnDef } from "@tanstack/react-table"
import { User } from "../_interfaces/user"
import { DataTable } from "@/components/ui/dataTable"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

 const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: ({row}) => {
        return <div>{row.getValue('id')}</div>
        }
      },
      {
        accessorKey: 'name',
        header: ({column}) => {
          return (
          <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome  
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
          )
        },
        cell: ({row}) => {
        return <div>{row.getValue('name')}</div>
        }
      },
      {
        accessorKey: 'username',
        header: 'Usuário',
        cell: ({row}) => {
        return <div>{row.getValue('username')}</div>
        }
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: ({row}) => {
        return <div>{row.getValue('email')}</div>
        }
      },
      {
        accessorKey: 'company.name',
        id: 'companyName',
        header: 'Empresa',
        cell: ({row}) => {
        return <div>{row.getValue('companyName')}</div>
        }
      },
];

interface Props {
    users: User[];
}

export default function UsersDataTable({users}:Props){
    return <DataTable columns={columns} data={users} pageSize={5} />
}