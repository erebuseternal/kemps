# kemps


## Development Environment
You can use [Visual Studio Code](https://code.visualstudio.com/) paired with [Docker](https://www.docker.com/) to quickly setup a development environment. The following steps were scooped out of this guide: [Developing Inside a Container](https://code.visualstudio.com/docs/remote/containers). 

### Step 1: Install
You can use the links above to install both VSCode and Docker onto your local machine. 

### Step 2: VSCode Extensions
You'll need the following extension for all of this to work: Visual Studio Code Remote - Containers

### Step 3: Clone Repo into Container
- Run the *Remote-Containers: Clone Repository in Container Volume* command from the Command Palette 
- Enter the https link to this repository `https://github.com/erebuseternal/kemps` (you can also specify a branch)
- If prompted select the option to build from the Dockerfile in the repository (the .devcontainer config should prevent this)
- Let the container build!

### Step 4: Setting up Git
- Go into .devcontainer/devcontainer.json and update the `postCreateCommand` to reflect your git credentials
- Rebuild the container using the *Remote-Containers: Rebuild Container* command from the Command Palette
- Once you're ready to make a commit you should be able to push up and VSCode will prompt you to sign in

Everything should now work! If you want to run a terminal session on your container you simply need to open up a terminal in VSCode. 

## Creating an App From Scratch
Just run:
```bash
npx create-react-app app
```

And to run it:
```bash
cd app
npm start
```

[source](https://reactjs.org/docs/create-a-new-react-app.html)

### Starting from a New Container
When you start up a new container the dependencies for the app will be missing. To fix this simply cd into `app` and run:
```bash
npm update
npm install react-bootstrap bootstrap
```