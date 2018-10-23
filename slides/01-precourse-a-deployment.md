<!-- sectionTitle: Pre-course A: Deployment Considerations -->

# Arches Deployment Considerations
## Background Information

---

## Lesson Overview

In this module we will briefly discuss hosting considerations for Arches
deployment, a few of the decision points, and provide abundant links for further
research and exploration.

#### Topics:
-   Deployment Considerations
-   Platform Options
-   High Usage optimization options
-   Hosted Examples
-   Takeaway

---

## Deployment considerations:
-   What are the organizational specific considerations?
    -   Are there institutional hosting requirements? Is in-house hosting required? Is there sufficient in-house resources to manage an in-house solution? Is there existing in-house expertise in hosting?
    -   Is there existing in-house experience with a specific cloud? AWS? Azure?
-   How much usage is expected?
    -   How many people will be searching? editing? creating reports?
-   What Resource Models being used?
    -   Is the data file heavy (Images, PDFs, etc)?
    -   How deeply nested is the Resource Model?

---

## Platform Options: Location

-   In House:
    -   Requires managing physical servers and networking infrastructure
    -   Requires higher quality internet connection to the server
    -   Less flexible to grow with increase in usage
    -   Often has a fixed up front cost
-   Cloud Hosting:
    -   Requires managing virtual servers
    -   Requires specific training for different cloud platforms
    -   More flexible to grow with increase in usage
    -   Often has an ongoing monetary cost

---

## Platform Options: Architecture

-   Single Server:
    -   Simple deployment and setup
    -   Allows all Arches dependancies to be easily accessible on one server
    -   Less flexible to grow with increase in usage
-   Distributed Architecture:
    -   More complex deployment and setup
    -   Can lower costs with running multiple instances of Arches
    -   Higher performance
    -   More flexible to grow with increase in usage

---

## Platform Options: Operating System

All platforms require specific knowledge and experience to maintain.

Each platform has both positives and negatives associated with them.

-   Linux:
    -   Most widely supported and used OS to host Arches
    -   All Arches dependancies have been tested and work as expected
-   Docker:
    -   Obfuscates management commands in a container
    -   Can be hosted on Container Platforms
-   Windows:
    -   Least used OS to host Arches.
    -   Some features are not available, including generating Raster Tiles
    -   Difficult to set up, must use IIS.

---

## Platform Options: Web Server

-   Apache:
    -   Traditional Open Source Web Server
    -   Everything and the kitchen sink
    -   [Serving Arches with Apache](https://arches.readthedocs.io/en/stable/serving-arches-with-apache/)
-   Nginx:
    -   Currently used with provided Docker-Compose
    -   New. Lean. Small.
    -   [Serving django with nginx](https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-18-04)
-   IIS (Windows only):
    -   Currently must be used when installing on Arches on Windows

---

## Platform Options: Cloud Services

All Cloud Services require specific knowledge and experience to maintain.

Each Cloud Service has both positives and negatives associated with them.

-   AWS:
    -   Farallon's hosting service of choice
    -   [Hosted PostgreSQL (RDS)](https://aws.amazon.com/rds/), [Hosted ElasticSearch](https://aws.amazon.com/elasticsearch-service/), [Hosted Data Storage](https://aws.amazon.com/s3/)
-   Azure:
    -   [Hosted PostgreSQL](https://azure.microsoft.com/en-us/services/postgresql/)
    -   Can be integrated with internal Microsoft Resources such as Active Directory
-   Others (DigitalOcean, Google Cloud, ...):
    -   Unknown ability to host Arches in a distributed manner

---

## Best Practice for Deployments

-   SSL/Encryption
    -   The web is moving towards encryption. Deploy with an SSL certificate! See [Let's Encrypt](https://letsencrypt.org/).
-   Projects/Packages:
    -   Arches supports the loading of Packages into Projects. Host the Package in a git repo and use the [`load_package`](https://arches.readthedocs.io/en/stable/command-line-reference/#loading-a-package-into-a-project) command.
-   Back up. Back up. Back up.
-   Ensure PostgreSQL is properly setup and tuned with sufficient security settings.
-   Ensure [sending of emails](https://docs.djangoproject.com/en/1.11/howto/deployment/checklist/#email-backend-and-related-settings) has been configured correctly
-   Set up monitoring. On AWS, See [Cloudwatch](https://aws.amazon.com/cloudwatch/)

---

## Optimization for Deployment

-   PostgreSQL
    -   Setup Logging, Autovacuuming, tweak `work_mem`. Consider running a Hosted PostgreSQL setup to avoid too much tweaking.
-   Set up and tune [django caching](https://docs.djangoproject.com/en/1.11/topics/cache/) through testing.

---

## Example Deployments

-   Lincoln Arcade - [https://arcade.lincoln.gov.uk](https://arcade.lincoln.gov.uk)
    -   Distributed Architecture
-   Arches V4 Demo Site - [http://v4demo.archesproject.org](http://v4demo.archesproject.org)
    -   Single Server

---

## Deployment Takeaways

-   Every deployment is different.
    -   There are a lot of decisions to be made regarding production deployments, ranging from usage, redundancy requirements, to the complexity of resource models.
-   The Arches Development Team typically follows the following patterns:
    -   Cloud Hosting solution unless your organization requires In House hosting
    -   Distributed Architecture provides a more robust ability to expand with usage and re-use resources.
    -   Linux/Docker allows quick deployment and dependancies that have been tested to work.
    -   AWS is the cloud that is most widely used among the Development Team.
-   See [Arches Implementation Considerations](https://www.archesproject.org/implementation-considerations/)

---

## Further Reading

Django on AWS:
-   [Deploy a highly available Python Web App on AWS](https://aws.amazon.com/getting-started/projects/deploy-python-application/)
-   [Deploying a Django app on Amazon EC2 instance (includes autoscaling and load balancing)](https://www.agiliq.com/blog/2014/08/deploying-a-django-app-on-amazon-ec2-instance/)
-   [Scaling django on AWS](https://www.scribd.com/doc/54883641/Scaling-Django-Apps-With-Amazon-AWS)
Using AWS S3:
-   [Storing Media on AWS S3 (Arches Wiki)](https://github.com/archesproject/arches/wiki/Storing-Media-on-AWS-S3)
-   [Deleting S3 assets for Arches (Arches Forum)](https://groups.google.com/forum/#!topic/archesproject/QHKqMISRkV8)
Monitoring:
-   [Setup django with AWS Cloudwatch](http://www.kidstrythisathome.com/2017/03/django-logging-with-aws-cloudwatch-and-watchtower.html)
