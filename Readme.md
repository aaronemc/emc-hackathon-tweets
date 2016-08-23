# EMC Hackathon Tweets

![foo.png](https://raw.githubusercontent.com/EMC-UI/emc-hackathon-tweets/master/sample.png)

This hackathon example app involves using the [twitter search API](https://dev.twitter.com/rest/public/search) to retrieve content (tweets) from [Twitter](http://twitter.com).  The example uses search strings of **from:guychurchward** , **#emc**, and **@emc**

## Getting Started
1. Fork this repo into your own account.  This creates your own copy which you can make changes to.  Click this button in the upper-right.
![fork](https://raw.githubusercontent.com/EMC-UI/emc-hackathon-tweets/master/fork.png)
1. Now clone the repo onto your machine.  This 'checks out' the code into your local environment.
```
git clone https://github.com/EMC-UI/emc-hackathon-tweets.git
```

## Choose a starting point

The project is broken into branches from 1 to 9.  Branch 1 starts with a minimal skeleton project, branch 9 is the full working example.

**full stackers** Be brave and start with [step-1](https://github.com/EMC-UI/emc-hackathon-tweets/tree/step-1).  You can always look at further steps for hints.

**front-endians** To start with complete plumbing, and only build the UI, start with [step 5](https://github.com/EMC-UI/emc-hackathon-tweets/tree/step-5)

**back-endians** To start with a complete UI, and build only the plumbing, start with [complete-ui](https://github.com/EMC-UI/emc-hackathon-tweets/tree/complete-ui)


1. [**step-1**](https://github.com/EMC-UI/emc-hackathon-tweets/tree/step-1) - Almost nothing.  Just a few placeholder files for client and server code
1. [**step-2**](https://github.com/EMC-UI/emc-hackathon-tweets/tree/step-2) - Minimal express server with /get and /put endpoints
1. [**step-3**](https://github.com/EMC-UI/emc-hackathon-tweets/tree/step-3) - Adds server code to deal with twitter authentication
1. [**step-4**](https://github.com/EMC-UI/emc-hackathon-tweets/tree/step-4) - Adds server code to deal with getting tweets
1. [**step-5**](https://github.com/EMC-UI/emc-hackathon-tweets/tree/step-5) - Adds raw tweet data delivered to the UI
1. [**step-6**](https://github.com/EMC-UI/emc-hackathon-tweets/tree/step-6) - Adds the simplest UI to display tweets
1. [**step-7**](https://github.com/EMC-UI/emc-hackathon-tweets/tree/step-7) - Adds a stylesheet to the UI
1. [**step-8**](https://github.com/EMC-UI/emc-hackathon-tweets/tree/step-8) - Display tweets in horizontal boxes, but no movement
1. [**step-9**](https://github.com/EMC-UI/emc-hackathon-tweets/tree/step-9) - Final working example with css3 animation, sass, and grunt
1. [**complete-ui**](https://github.com/EMC-UI/emc-hackathon-tweets/tree/complete-ui) - In this step, the UI is complete, and you provide the backend plumbing

## Checkout a branch
Once you've picked a starting point, checkout one of the named branches.  For example, to checkout the **step-1** branch:
```
git checkout step-1
```

## Hack away!
The basic workflow you should follow goes like this:<br/>
1. Write code, run code, have fun<br/>
2. `git add {filename}` to add new files<br/>
3. `git commit -a` to commit changes to your local repo<br/>
4. `git push origin {branch name}` to push changes up to github<br/>

Here is a [git cheatsheet](http://rogerdudler.github.io/git-guide/files/git_cheat_sheet.pdf) and a good guide for [getting started with git](http://rogerdudler.github.io/git-guide/).
