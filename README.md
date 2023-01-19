# soled

### Currently hosted on Vercel [here](https://soled.vercel.app/)
How to use:    
1. To use soled in its current state, run locally (described below), or navigate to the Vercel link above
2. Connect your wallet (on upper right side of the screen)
3. Make sure you're connected to devnet and have devnet SOL
4. Sign up as an Instructor by clicking on "Become an Instructor" in the navbar, clicking "Register," and entering the required fields
5. After signing up as an Instructor, create a Course by clicking "My Courses" on the Navbar, clicking "Add Course", and entering the required fields
6. On the Homepage:
    1. You should see a course card for the Course you created if there were no errors
    2. You should see yourself in the list of Instructors at the bottom of the page
    3. You can interact with the course cards
        - Click on the Author to be directed to their Instructor page which includes their picture, summary, and Course offerings
        - Click on the Course name to be directed to the Course page, which will include an overview, rating, and links to different sections of the Course    
<br />
Of course there are INFINITE changes to make before this thing becomes even close to functional. A list of immediate action items and issues to tackle can be here ⮯

[Tasks](https://github.com/users/KitanGarcia/projects/1/views/1)  

<br />    

### Figma
[Link](https://www.figma.com/file/34XxamFP4VfnNoKDgPHhKg/Education-on-dev-2---for-Kitan?node-id=11%3A18638)    
[Link](https://www.figma.com/file/QGzfkXyLAYKcVL28kl76eq/Untitled?node-id=0%3A1&t=N0dr5zxH1E0hMeJn-0)    
[Link](https://www.figma.com/file/34XxamFP4VfnNoKDgPHhKg/Education-on-dev-2---for-Kitan?node-id=34%3A3905&t=CltAmQzxt58zxKlT-0)    

## 🏃️ Installing and Running Locally

What you need:

- [Git](https://git-scm.com/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Anchor](https://github.com/coral-xyz/anchor)
- [Solana](https://docs.solana.com/cli/install-solana-cli-tools)

1. Navigate to where you want the project code to be in your filesystem, and run
   `git clone https://github.com/KitanGarcia/soled.git`.

2. Enter the project directory.

4. Run `anchor build`.

5. Navigate to **/app**.
    1. Run `npm install` or `yarn install`. This should install all the packages that are required by our frontend.
    2. Run `npm run dev` or `yarn run dev`.
    3. If there is an error stating that a module is missing, run `npm/yarn install <name_of_missing_package>`. For example, `npm/yarn install @project-serum/anchor`.
  3. While `npm/yarn run dev` is running, open a browser and navigate to `http://localhost:3000/`.
   Once there, the app should be working and ask you to connect your wallet. Once you have done so, you should be able to see the homepage and be able to create Courses and Instructors.
      1. If it doesn't allow you to create a Course or Instructor, it may be because you need SOL in your wallet. And/Or it could be because your wallet is not on the correct "net." Since we're testing this code on devnet, make sure that the wallet you're using to connect to the app is also on devnet and that it has sufficient funds.
