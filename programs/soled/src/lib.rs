use anchor_lang::prelude::*;

pub mod components;
use components::*;

declare_id!("Hen1HiTHovdX68H4PVBPTGfww6FGL3zgXTeboBZB7EwW");


#[program]
pub mod soled {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    // Instructor
    pub fn create_instructor(
        ctx: Context<CreateInstructor>,
        username: String,
        profile_pic_url: String,
        background_pic_url: String,
    ) -> Result<()> {
        components::create_instructor(ctx, username, profile_pic_url, background_pic_url)
    }

    pub fn delete_instructor(ctx: Context<DeleteInstructor>) -> Result<()> {
        components::delete_instructor(ctx) 
    }

    // Course
    pub fn create_course(
        ctx: Context<CreateCourse>,
        title: String,
        rating: String,
        price: u32,
        lessons: u32,
        thumbnail_url: String,
        course_number: String,
    ) -> Result<()> {
        components::create_course(ctx, title, rating, price, lessons, thumbnail_url, course_number)
    }

    pub fn delete_course(ctx: Context<DeleteCourse>) -> Result<()> {
        components::delete_course(ctx) 
    }
}

#[derive(Accounts)]
pub struct Initialize {}
