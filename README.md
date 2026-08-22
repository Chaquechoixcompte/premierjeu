# Le Livre dont vous êtes le héros

Jeu web narratif à choix multiples, hébergé sur GitHub Pages, avec comptes joueurs via Supabase.

## Mise en route

### 1. Configurer Supabase

1. Va sur [supabase.com](https://supabase.com) et crée un nouveau projet (ou réutilise celui de l'appli famille si tu préfères un projet séparé — recommandé pour ne pas mélanger les données).
2. Dans **Project Settings > API**, récupère :
   - l'**URL du projet**
   - la clé **anon / public**
3. Ouvre `js/supabase-config.js` et remplace :
   ```js
   const SUPABASE_URL = "https://TON-PROJET.supabase.co";
   const SUPABASE_ANON_KEY = "TA_CLE_ANON_PUBLIC";
   ```

### 2. Créer la table de progression

Dans Supabase, va dans **SQL Editor** et exécute :

```sql
create table progression (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  chapitre_actuel text not null,
  historique jsonb default '[]'::jsonb,
  updated_at timestamp with time zone default now(),
  unique(user_id)
);

alter table progression enable row level security;

create policy "Les joueurs voient leur propre progression"
  on progression for select
  using (auth.uid() = user_id);

create policy "Les joueurs modifient leur propre progression"
  on progression for update
  using (auth.uid() = user_id);

create policy "Les joueurs créent leur propre progression"
  on progression for insert
  with check (auth.uid() = user_id);
```

### 3. Activer la confirmation par email (optionnel)

Par défaut Supabase demande une confirmation par email à l'inscription. Tu peux désactiver ça dans **Authentication > Providers > Email** si tu veux que les joueurs jouent immédiatement sans vérifier leur boîte mail (pratique pour un usage familial/entre amis).

### 4. Mettre le site en ligne avec GitHub Pages

1. Crée un dépôt GitHub et pousse tous ces fichiers dedans.
2. Va dans **Settings > Pages** du dépôt.
3. Choisis la branche `main` et le dossier `/ (root)`.
4. Ton jeu sera accessible à une adresse du type `https://ton-pseudo.github.io/nom-du-depot/`.

## Ajouter des chapitres

Chaque chapitre est un fichier JSON dans `chapitres/`, nommé `chapitre_XXX.json` :

```json
{
  "id": "chapitre_006",
  "titre": "Titre du chapitre",
  "texte": "Le texte de l'histoire pour ce chapitre.",
  "image": "",
  "choix": [
    { "texte": "Option A", "chapitre_suivant": "chapitre_007" },
    { "texte": "Option B", "chapitre_suivant": "chapitre_008" }
  ],
  "fin": false
}
```

- `id` doit correspondre exactement au nom du fichier (sans `.json`)
- Pour une fin d'histoire : mets `"fin": true` et `"choix": []`
- Le champ `image` est optionnel (laisse `""` si tu n'en mets pas)

Cinq chapitres d'exemple sont déjà inclus pour tester le fonctionnement (`chapitre_001` à `chapitre_005`) : deux embranchements qui mènent chacun à une fin.

## Structure du projet

```
mon-jeu-livre/
├── index.html              # Connexion / inscription
├── jeu.html                 # Page du jeu
├── css/style.css
├── js/
│   ├── supabase-config.js   # Tes clés Supabase
│   ├── auth.js
│   └── game.js
├── chapitres/
│   ├── chapitre_001.json
│   └── ...
└── README.md
```
