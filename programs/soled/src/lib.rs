use anchor_lang::prelude::*;

pub mod components;
use components::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

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

    // Course
    pub fn create_course(
        ctx: Context<CreateCourse>,
        title: String,
        description: String,
        thumbnail_url: String,
    ) -> Result<()> {
        components::create_course(ctx, title, description, thumbnail_url)
    }

    pub fn delete_course(ctx: Context<DeleteCourse>) -> Result<()> {
        components::delete_course(ctx) 
    }
}

#[derive(Accounts)]
pub struct Initialize {}
