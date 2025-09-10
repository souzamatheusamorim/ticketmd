"use client";

import { useState } from "react";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Tipos
type Status = "lead" | "contato" | "proposta" | "fechado" | "perdido";

interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  empresa?: string;
  status: Status;
  notas?: string;
  valor?: number;
  origem?: string;
  responsavel?: string;
  historico?: {
    id: string;
    data: string;
    resultado: string;
  }[];
}

// Mock fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function RevendaPage() {
  const { data: clientes = [], mutate } = useSWR<Cliente[]>("/api/clientes", fetcher);
  const [novoCliente, setNovoCliente] = useState<Cliente>({
    id: "",
    nome: "",
    email: "",
    telefone: "",
    status: "lead",
    historico: [],
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleEditarCliente(cliente: Cliente) {
    setNovoCliente(cliente);
    setIsDialogOpen(true);
  }

  async function handleSalvarCliente() {
    if (novoCliente.id) {
      await fetch("/api/clientes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoCliente),
      });
    } else {
      await fetch("/api/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoCliente),
      });
    }
    setIsDialogOpen(false);
    mutate();
  }

  async function handleExcluirCliente(id: string) {
    await fetch(`/api/clientes?id=${id}`, {
      method: "DELETE",
    });
    mutate();
  }

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">Clientes</h1>

      <div className="flex gap-2">
        <Input placeholder="Buscar por nome ou email" />
        <Select
          value={novoCliente.status}
          onValueChange={(value: Status) => setNovoCliente({ ...novoCliente, status: value })}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filtrar status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lead">Lead</SelectItem>
            <SelectItem value="contato">Em Contato</SelectItem>
            <SelectItem value="proposta">Proposta Enviada</SelectItem>
            <SelectItem value="fechado">Fechado</SelectItem>
            <SelectItem value="perdido">Perdido</SelectItem>
          </SelectContent>
        </Select>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Criar / Editar Cliente</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar / Editar Cliente</DialogTitle>
            </DialogHeader>
            <div className="space-y-2 mt-2">
              <Input
                placeholder="Nome"
                value={novoCliente.nome}
                onChange={(e) => setNovoCliente({ ...novoCliente, nome: e.target.value })}
              />
              <Input
                placeholder="Email"
                value={novoCliente.email}
                onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })}
              />
              <Input
                placeholder="Telefone"
                value={novoCliente.telefone}
                onChange={(e) => setNovoCliente({ ...novoCliente, telefone: e.target.value })}
              />
              <Input
                placeholder="Empresa"
                value={novoCliente.empresa}
                onChange={(e) => setNovoCliente({ ...novoCliente, empresa: e.target.value })}
              />
              <Select
                value={novoCliente.status}
                onValueChange={(value: Status) => setNovoCliente({ ...novoCliente, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="contato">Em Contato</SelectItem>
                  <SelectItem value="proposta">Proposta Enviada</SelectItem>
                  <SelectItem value="fechado">Fechado</SelectItem>
                  <SelectItem value="perdido">Perdido</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Notas"
                value={novoCliente.notas}
                onChange={(e) => setNovoCliente({ ...novoCliente, notas: e.target.value })}
              />
              <Input
                placeholder="Valor"
                type="number"
                value={novoCliente.valor}
                onChange={(e) => setNovoCliente({ ...novoCliente, valor: Number(e.target.value) })}
              />
              <Input
                placeholder="Origem"
                value={novoCliente.origem}
                onChange={(e) => setNovoCliente({ ...novoCliente, origem: e.target.value })}
              />
              <Input
                placeholder="Responsável"
                value={novoCliente.responsavel}
                onChange={(e) => setNovoCliente({ ...novoCliente, responsavel: e.target.value })}
              />
              <Button onClick={handleSalvarCliente} className="mt-2">
                Salvar Cliente
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clientes.map((c) => (
          <Card key={c.id} className="border">
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold">{c.nome}</h2>
                <Badge>{c.status}</Badge>
              </div>
              <p className="text-sm">{c.email}</p>
              <p className="text-sm">{c.telefone}</p>
              <p className="text-sm">{c.empresa}</p>
              <div className="mt-2">
                {c.historico?.map((h) => (
                  <div key={h.id} className="text-xs text-gray-500">
                    <p>{h.data} - {h.resultado}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <Button variant="outline" onClick={() => handleEditarCliente(c)}>
                  Editar
                </Button>
                <Button variant="destructive" onClick={() => handleExcluirCliente(c.id)}>
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
