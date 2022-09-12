use crate::*;

//
// Endpoints
//
pub fn create_course(
    ctx: Context<CreateCourse>,
    title: String,
    description: String,
    thumbnail_url: String,
) -> Result<()> {
    let course: &mut Account<Course> = &mut ctx.accounts.course;
    let authority: &Signer = &ctx.accounts.authority;

    course.authority = *authority.key;
    course.title = title;
    course.description = description;
    course.thumbnail_url = thumbnail_url;

    Ok(())
}


// 
// Data Validators
// 
#[derive(Accounts)]
#[instruction(title: String, description: String, thumbnail_url: String)]
pub struct CreateCourse<'info> {
    // Create account of type Course and assign creator's pubkey as the payer
    // This also makes sure that we have only one course for the following combination
    #[account(
        init, 
        payer = authority, 
        space = Course::LEN
    )]
    pub course: Account<'info, Course>,

    // Define user as mutable - money in their account, description
    #[account(mut)]
    pub authority: Signer<'info>,

    // Ensure System Program is the official one from Solana and handle errors
    // Ensure benefit_number == num_benefits + 1
    pub system_program: Program<'info, System>,
}



//
// Data Structure
//
#[account]
pub struct Course {
    pub authority: Pubkey,
    pub title: String,
    pub description: String,
    pub thumbnail_url: String,
}


// Constants for sizing properties
const DISCRIMINATOR_LENGTH: usize = 8;
const PUBKEY_LENGTH: usize = 32;
const STRING_LENGTH_PREFIX: usize = 4;
const TITLE_LENGTH: usize = 20 * 4;
const DESCRIPTION_LENGTH: usize = 200 * 4;
const THUMBNAIL_URL_LENGTH: usize = 300 * 4;

impl Course {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBKEY_LENGTH
        + STRING_LENGTH_PREFIX 
        + TITLE_LENGTH 
        + STRING_LENGTH_PREFIX 
        + DESCRIPTION_LENGTH 
        + STRING_LENGTH_PREFIX
        + THUMBNAIL_URL_LENGTH;
}
