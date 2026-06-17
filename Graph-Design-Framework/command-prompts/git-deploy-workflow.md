# Git Deploy Workflow — Doble Rol

## Contexto
Chris trabaja con dos roles simultáneos en Git:

### 🧑‍💻 Rol 1: Empleado (Repo del equipo)
- **Remote**: `origin` → `goams/go-ams-landing`
- **Branch**: `feature/redesign-landing`
- Los pushes pasan por **review del jefe** antes de merge a `main`
- Comando: `git push origin feature/redesign-landing`

### 👑 Rol 2: Jefe de su Fork (Preview en Vercel)
- **Remote**: `myfork` → `github.com/ChrisBeep98/go-ams-landing-fork`
- **Branch**: Se pushea directo a `main` (sin PR, sin review)
- Vercel despliega automáticamente desde `main` del fork
- Comando: `git push myfork feature/redesign-landing:main --force`

## Flujo de Commit y Deploy

Cuando el usuario pida **"commit"** o **"commit y push"**, siempre ejecutar:

```bash
# 1. Stage y commit
git add -A
git commit -m "<mensaje descriptivo>"

# 2. Push al repo del equipo (como empleado)
git push origin feature/redesign-landing

# 3. Push al fork para Vercel (como jefe)
git push myfork feature/redesign-landing:main --force
```

## Variables de Entorno en Vercel
El fork usa variables dummy porque no necesita backend real:
- `DATABASE_URL` = `postgresql://dummy:dummy@localhost:5432/dummy`
- `DIRECT_URL` = `postgresql://dummy:dummy@localhost:5432/dummy`
- `NEXT_PUBLIC_SUPABASE_URL` = `https://dummy.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = JWT dummy

## Notas Importantes
- El `--force` en el fork es **seguro** porque el fork es solo para preview
- **Nunca** usar `--force` en `origin` (repo del equipo)
- Si Vercel no actualiza, verificar en Vercel Dashboard → Deployments
- Los checks de Netlify en el fork son heredados y se ignoran
