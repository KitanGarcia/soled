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

    pub fn create_course(
        ctx: Context<CreateCourse>,
        title: String,
        description: String,
        thumbnail_url: String,
    ) -> Result<()> {
        components::create_course(ctx, title, description, thumbnail_url)
    }
}

#[derive(Accounts)]
pub struct Initialize {}
