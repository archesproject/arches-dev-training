## Optimization for Deployment

-   PostgreSQL
    -   Setup Logging, Autovacuuming, tweak `work_mem`. Consider running a Hosted PostgreSQL setup to avoid too much tweaking. 
-   Projects/Packages:
    -   Arches supports the loading of Packages into Projects. Host the Package in a git repo and use the [`load_package`](https://arches.readthedocs.io/en/stable/command-line-reference/#loading-a-package-into-a-project) command.
-   Set up and tune [django caching](https://docs.djangoproject.com/en/1.11/topics/cache/) through testing. 
