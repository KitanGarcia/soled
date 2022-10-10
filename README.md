# soled

### Figma

[Link](https://www.figma.com/file/34XxamFP4VfnNoKDgPHhKg/Education-on-dev-2---for-Kitan?node-id=11%3A18638)

## How to Run the Project

What you need:

- [Git](https://git-scm.com/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Anchor](https://github.com/coral-xyz/anchor)

1. Make sure you have Git installed.
  1. Navigate to where you want to the project code to be in your filesystem, and run
   `git clone https://github.com/KitanGarcia/soled.git`.

2. Enter the project directory.

3. Make sure you have Anchor installed.
  1. Run `Anchor build`.

4. Make sure you have npm or yarn installed.

5. Navigate to **/app**.
  1. Run `npm install` or `yarn install`. This should install all the packages that are required by our frontend.
  2. Run `npm run dev` or `yarn run dev`.
    1. If there is an error stating that a module is missing, run `npm install <name_of_missing_package>`. For example, `npm install @project-serum/anchor`.
  3. While `npm run dev` is running, open a browser and navigate to `http://localhost:3000/`.
   Once there, the app should be working and ask you to connect your wallet. Once you have done so, you should be able to see the homepage and be able to create Courses and Instructors.
    1. If it doesn't allow you to create a Course or Instructor, it may be because you need SOL in your wallet. And/Or it could be because your wallet is not on the correct "net." Since we're testing this code on devnet, make sure that the wallet you're using to connect to the app is also on devnet.
