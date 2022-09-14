use anchor_lang::prelude::*;

pub mod components;
use components::*;

declare_id!("927s7hwrsmMG62c7U5iRCxJyJrXf5sgrz94tUTLeDbCe");

#[program]
pub mod soled {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

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
