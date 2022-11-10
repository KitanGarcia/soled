use crate::*;

//
// Endpoints
//
pub fn create_course(
    ctx: Context<CreateCourse>,
    title: String,
    rating: String,
    price: u32,
    num_lessons: u32,
    thumbnail_url: String,
    _course_number: String,
) -> Result<()> {
    let course: &mut Account<Course> = &mut ctx.accounts.course;
    let authority: &Signer = &ctx.accounts.authority;
    let instructor: &mut Account<Instructor> = &mut ctx.accounts.instructor;

    // Try to increment. If overflow, panic will propagate an error
    instructor.num_courses = instructor.num_courses.checked_add(1).unwrap();

    course.authority = *authority.key;
    course.title = title;
    course.rating = rating;
    course.price = price;
    course.num_lessons = num_lessons;
    course.thumbnail_url = thumbnail_url;
    course.bump = *ctx.bumps.get("course").unwrap();

    Ok(())
}

pub fn delete_course(_ctx: Context<DeleteCourse>) -> Result<()> {
    msg!("Course closed successfully");

    Ok(())
}


// 
// Data Validators
// 
#[derive(Accounts)]
#[instruction(title: String, rating: String, price: u32, num_lessons: u32, thumbnail_url: String, course_number: String)]
pub struct CreateCourse<'info> {
    // Create account of type Course and assign creator's pubkey as the payer
    // This also makes sure that we have only one course for the following combination
    #[account(
        init, 
        seeds = [instructor.key().as_ref(), b"course", course_number.as_ref()], 
        bump,
        payer = authority, 
        space = Course::LEN
    )]
    pub course: Account<'info, Course>,

    // Guarantee that account is both signed by authority
    // and that &instructor.authority == authority.key
    // In other words, signer must have an instructor account to create a course
    // Use here and for updating/deleting Course/Instructor accounts
    #[account(mut, has_one = authority)]
    pub instructor: Account<'info, Instructor>,

    // Define user as mutable - money in their account, description
    #[account(mut)]
    pub authority: Signer<'info>,

    // Ensure System Program is the official one from Solana and handle errors
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DeleteCourse<'info> {
    #[account(mut, close = authority)]
    pub course: Account<'info, Course>,

    #[account(mut, has_one = authority)]
    pub instructor: Account<'info, Instructor>,

    // Define user as mutable - money in their account, profile data, etc.
    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}



//
// Data Structure
//
#[account]
pub struct Course {
    pub authority: Pubkey,
    pub title: String,
    pub rating: String,
    pub price: u32,
    pub num_lessons: u32,
    pub thumbnail_url: String,
    pub bump: u8,
}


// Constants for sizing properties
const DISCRIMINATOR_LENGTH: usize = 8;
const PUBKEY_LENGTH: usize = 32;
const STRING_LENGTH_PREFIX: usize = 4;
const TITLE_LENGTH: usize = 20 * 4;
const RATING_LENGTH: usize = 200 * 4;
const PRICE_LENGTH: usize = 32;
const LESSONS_LENGTH: usize = 32;
const THUMBNAIL_URL_LENGTH: usize = 300 * 4;
const BUMP_LENGTH: usize = 1;

impl Course {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBKEY_LENGTH
        + STRING_LENGTH_PREFIX 
        + TITLE_LENGTH 
        + STRING_LENGTH_PREFIX 
        + RATING_LENGTH 
        + PRICE_LENGTH
        + LESSONS_LENGTH
        + STRING_LENGTH_PREFIX
        + THUMBNAIL_URL_LENGTH
        + BUMP_LENGTH;
}
