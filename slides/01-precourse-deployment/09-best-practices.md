## Best Practice for Deployments

-   SSL/Encryption
    -   The web is moving towards encryption. Deploy with an SSL certificate! See [Let's Encrypt](https://letsencrypt.org/).
-   Projects/Packages:
    -   Arches supports the loading of Packages into Projects. Host the Package in a git repo and use the [`load_package`](https://arches.readthedocs.io/en/stable/command-line-reference/#loading-a-package-into-a-project) command.
-   Back up. Back up. Back up.
-   Ensure PostgreSQL is properly setup and tuned with sufficient security settings.
-   Ensure [sending of emails](https://docs.djangoproject.com/en/1.11/howto/deployment/checklist/#email-backend-and-related-settings) has been configured correctly 
-   Set up monitoring. On AWS, See [Cloudwatch](https://aws.amazon.com/cloudwatch/)
