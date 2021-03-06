Pre-course Workshop on Arches Deployment/Hosting:
Lecture to people on things to think about when you are deploying arches for production without code
This is not a class on how to configure AWS or Docker or Azure.

Talk about deploying arches on different platforms, with a heads up on pitfalls for each of those options/patterns:
Linux, Windows/Azure, Docker or Amazon

Discussion about some of the key configuration things to set for Arches, including:
S3 for files

Deployment patterns:
super simple on Linux
Super simple on Amazon
Can do it on docker with offers
Windows, but here is the stuff you have to worry about and what constraints there are. 

Thinking of key configuration things:
Stuff that you have to set for configuring arches to your own specs. Some of those things are updating stuff in settings file, time zones, 
important things like defining DB connection strings
Configure arches to save files to s3.

You have a lot of implementation options.
Take away should be "I have lots of options to deploy this to production, both straight forward (with install script on linux) to use AWS to have a more sophisticated architecture, which gives more scalability, to Windows with known constraints, to Docker which is snazzy."

Actual deployment is so dependent on variables about the organization and deployment.
Include ideas on things to configure for production. 

Many URLS are encouraged. 
"Out of the box, we don't optimize PostgreSQL, here are some links that you could look into"

--------------------------------------------------------------------------------
ADAM COX: 
Here are some slides I have used in the past to talk about these topics. The audience was never a super technical one, but I tried to be as technical as would be appropriate.
old legion gis deployment-related slides.zip. Also, though it may be a bit out of date, see this document https://www.archesproject.org/implementation-considerations/

Deployment-related questions I have been asked after/while presenting about Arches, and some of the answers I typically give:

what is the best os to use?
...some linux, but first make sure you know what your production environment will be like. (I think a lot of people have wasted time trying to get Arches up and running on windows even though it will be eventually be deployed to a linux server anyway...) Also, if you are installing onto an institution's servers, you may be forced to use something like CentOS. It may make sense in that case to make a staging server on CentOS...
can multiple arches installations use the same server/postgres/elasticsearch?
yes, either with multiple domains/subdomains (cleanest) or with subdirectory urls (can get a little tricky). now with v4 mutiple instances can use the same ES, and using the same postgres has always been easy and advisable.
what is the best cloud provider to use?
AWS is extremely easy, but some folks are using Azure at this point as well.
what are arches minimum system requirements?
ES is the biggest memory user, and needs at least 2gb.... beyond that the app itself can run on a pretty small amount of memory (1gb is plenty), but should have more in production of course...
with a distributed architecture, what component should be given the most memory for the best performance gains?
is there an AWS AMI available with dependencies on it already?
I used to have an up-to-date one, but not at the moment.
what's the best way to back up an arches database?
I just have a script that copies pg dump files to S3, and have replication set up on some. RDS can do this for you as well.
(in the US) does Arches conform to NIST security controls (800-53)/are there Arches installations in use by the US federal government?
no to the latter, and to the former I suspect that some but certainly not all controls are met...
...etc. If I think of more stuff I'll mention it here. General rule of thumb: for any arches question that the farallon team has answered with "that's up to the implementer", then that's something that might be good to cover here (e-mail configuration, e.g.).

-------------------------------------------------------------------------------- 
Deployment Considerations from ARCHESPROJECT.ORG
Arches will need to reside on a server, either on an in-house server or on a cloud hosting service, or perhaps even a combination of the two. This may not be the type of software deployment that you are used to, so work your way through the following considerations to get a better idea of where and how to host Arches:

Institutional hosting requirements and rules
Begin by figuring out if your institution has rules you’ll need to follow when it comes to hosting databases and websites. In some cases, an in-house server is the only option, and in others, no such option will exist. This is important to consider up front, as it will impact the overall cost of the project.

Technical specifications
The Arches documentation recommends at least 4gb of RAM for evaluation and testing (8-16gb for production) and 10gb minimum disk space to install the code base and test dataset. However, required disk space really depends on the size and type of the data you’ll be storing. Do you have a lot of photos or videos? These types of resources will use much more disk space than a simple historic resource.

Which operating system (OS) will work best for Arches?
Arches was developed in a Linux environment, but is designed to work with Windows as well. If you have full control over your choice of OS, Linux (Ubuntu) would probably be the easiest way to go, as Windows installations require a few extra steps. Other flavors of Linux (RedHat, CentOS) are supported as well.
Which cloud hosting service will work best for Arches?
If you are going to use a cloud hosting service, there are many good options—Google, Microsoft and Amazon all offer cloud hosting services, as well as smaller companies like DigitalOcean. Any of these will work for Arches. However, at this point, the most extensive tests and deployments have been done using Amazon Web Services (AWS). We have found AWS to be very effective in that it is flexible, well-documented, and cost- effective.

Ongoing maintenance and server administration
It will be necessary to establish a system administrator, potentially train that administrator as needed, and determine who will provide ongoing technical support. Ongoing support will consist of basic server updates, as well as Arches upgrades or enhancements.