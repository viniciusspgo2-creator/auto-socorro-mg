'use client'

import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

type Post = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string | null
  published: boolean
  publishedAt: string
}

type FormState = {
  id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  published: boolean
}

const EMPTY: FormState = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  coverImage: '',
  published: false,
}

const COVERS = [
  '/img/frota.webp',
  '/img/guincho-vermelho.webp',
  '/img/escavadeira.webp',
  '/img/operacao-rodovia.webp',
  '/img/socorro-pesado.webp',
  '/img/frota-aerea.webp',
  '/img/plataforma.webp',
  '/img/reboque-caminhao.webp',
  '/img/maquina-1.webp',
  '/img/atendente.webp',
]

export function BlogManager() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<FormState>(EMPTY)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/posts')
      const data = await res.json()
      setPosts(data.posts ?? [])
    } catch {
      toast.error('Erro ao carregar artigos.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  function openNew() {
    setForm(EMPTY)
    setDialogOpen(true)
  }

  function openEdit(post: Post) {
    setForm({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage ?? '',
      published: post.published,
    })
    setDialogOpen(true)
  }

  async function save() {
    setSaving(true)
    try {
      const res = await fetch(form.id ? `/api/admin/posts/${form.id}` : '/api/admin/posts', {
        method: form.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erro ao salvar.')
      toast.success(form.id ? 'Artigo atualizado.' : 'Artigo criado.')
      setDialogOpen(false)
      load()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Erro ao salvar.')
    } finally {
      setSaving(false)
    }
  }

  async function remove() {
    if (!deleteId) return
    try {
      const res = await fetch(`/api/admin/posts/${deleteId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      toast.success('Artigo excluído.')
      load()
    } catch {
      toast.error('Erro ao excluir.')
    } finally {
      setDeleteId(null)
    }
  }

  async function restoreSeed() {
    try {
      const res = await fetch('/api/admin/seed', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error()
      toast.success(`${data.created} artigos padrão restaurados.`)
      load()
    } catch {
      toast.error('Erro ao restaurar artigos.')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
          <p className="text-sm text-muted-foreground">
            Crie, edite e publique artigos do blog.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={restoreSeed}>
            Restaurar 6 artigos padrão
          </Button>
          <Button onClick={openNew}>Novo artigo</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Artigos ({posts.length})</CardTitle>
          <CardDescription>
            Artigos publicados aparecem no blog público e no sitemap.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Carregando…</p>
          ) : posts.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nenhum artigo ainda. Clique em “Novo artigo” ou restaure os artigos padrão.
            </p>
          ) : (
            <ul className="divide-y">
              {posts.map((post) => (
                <li key={post.id} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-medium">{post.title}</p>
                      {post.published ? (
                        <Badge className="shrink-0">Publicado</Badge>
                      ) : (
                        <Badge variant="secondary" className="shrink-0">
                          Rascunho
                        </Badge>
                      )}
                    </div>
                    <p className="truncate text-xs text-muted-foreground">/blog/{post.slug}</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button variant="outline" size="sm" onClick={() => openEdit(post)}>
                      Editar
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => setDeleteId(post.id)}>
                      Excluir
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
          <DialogHeader>
            <DialogTitle>{form.id ? 'Editar artigo' : 'Novo artigo'}</DialogTitle>
            <DialogDescription>
              O conteúdo aceita Markdown simples (## títulos, listas, **negrito**).
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="post-title">Título</Label>
              <Input
                id="post-title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="post-slug">Slug (URL)</Label>
              <Input
                id="post-slug"
                placeholder="gerado a partir do título"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="post-excerpt">Resumo (aparece no Google e nos cards)</Label>
              <Textarea
                id="post-excerpt"
                rows={2}
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="post-content">Conteúdo</Label>
              <Textarea
                id="post-content"
                rows={12}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="post-cover">Imagem de capa</Label>
              <select
                id="post-cover"
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                value={form.coverImage}
                onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
              >
                <option value="">Sem capa</option>
                {COVERS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                id="post-published"
                checked={form.published}
                onCheckedChange={(v) => setForm({ ...form, published: v })}
              />
              <Label htmlFor="post-published">Publicado</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={save} disabled={saving || !form.title || !form.content}>
              {saving ? 'Salvando…' : 'Salvar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Excluir artigo?</DialogTitle>
            <DialogDescription>
              Esta ação não pode ser desfeita. O link do artigo deixará de existir.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={remove}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
