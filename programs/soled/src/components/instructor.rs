use crate::*;

//
// Endpoints
//
pub fn create_instructor(
    ctx: Context<CreateInstructor>,
    username: String,
    profile_pic_url: String,
    background_pic_url: String,
) -> Result<()> {
    let instructor: &mut Account<Instructor> = &mut ctx.accounts.instructor;
    let authority: &Signer = &ctx.accounts.authority;

    instructor.authority = *authority.key;
    instructor.username = username;
    instructor.profile_pic_url = profile_pic_url;
    instructor.background_pic_url = background_pic_url;
    instructor.num_followers = 0;
    instructor.num_following = 0;
    instructor.num_courses = 0;
    instructor.rating = 0;
    instructor.bump = *ctx.bumps.get("instructor").unwrap();

    Ok(())
}

pub fn delete_instructor(_ctx: Context<DeleteInstructor>) -> Result<()> {
    msg!("Instructor closed successfully");

    Ok(())
}

// 
// Data Validators
//
#[derive(Accounts)]
#[instruction(username: String, profile_pic_url: String, background_pic_url: String)]
pub struct CreateInstructor<'info> {

    // Create account of type Instructor and assign instructor's pubkey as the payer
    // Seeded with instructorWalletPubKey + "instructor"
    #[account(
        init, 
        seeds = [b"instructor".as_ref(), authority.key().as_ref()], 
        constraint = instructor.to_account_info().owner == program_id,
        bump,
        payer = authority, 
        space = Instructor::LEN
    )]
    pub instructor: Account<'info, Instructor>,

    // Define user as mutable - money in their account, description
    #[account(mut)]
    pub authority: Signer<'info>,


    // Ensure System Program is the official one from Solana and handle errors
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DeleteInstructor<'info> {
    #[account(
        mut,
        seeds = [authority.key().as_ref(), b"instructor".as_ref()],
        bump = instructor.bump,
        close = authority
    )]
    pub instructor: Account<'info, Instructor>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

//
// Data Structure
//
#[account]
pub struct Instructor {
    pub authority: Pubkey,
    pub username: String,
    pub num_followers: u8,
    pub num_following: u8,
    pub num_courses: u8,
    pub rating: u8,
    pub profile_pic_url: String,
    pub background_pic_url: String,
    pub bump: u8,
}

// Constants for sizing properties
const DISCRIMINATOR_LENGTH: usize = 8;
const PUBKEY_LENGTH: usize = 32;
const NUM_FOLLOWERS_LENGTH: usize = 1;
const NUM_FOLLOWING_LENGTH: usize = 1;
const NUM_COURSES_LENGTH: usize = 1;
const STRING_LENGTH_PREFIX: usize = 4;
const USERNAME_LENGTH: usize = 20 * 4;
const PROFILE_PIC_URL_LENGTH: usize = 300 * 4;
const BACKGROUND_PIC_URL_LENGTH: usize = 300 * 4;
const BUMP_LENGTH: usize = 1;

impl Instructor {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBKEY_LENGTH
        + NUM_FOLLOWERS_LENGTH
        + NUM_FOLLOWING_LENGTH
        + NUM_COURSES_LENGTH
        + STRING_LENGTH_PREFIX 
        + USERNAME_LENGTH 
        + STRING_LENGTH_PREFIX 
        + PROFILE_PIC_URL_LENGTH 
        + STRING_LENGTH_PREFIX
        + BACKGROUND_PIC_URL_LENGTH
        + BUMP_LENGTH;
}
