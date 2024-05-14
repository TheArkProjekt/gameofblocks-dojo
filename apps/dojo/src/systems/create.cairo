#[system]
mod create {
    // use gameofblocks::components::kingdom::Kingdom;
    // use gameofblocks::components::land::Land;
    use dojo::world::Context;
    use traits::{Into, TryInto};

    fn execute(ctx: Context) -> (u32, felt252) {
        let player_id: felt252 = ctx.origin.into();
        let kingdom_id = ctx.world.uuid();

        // set !(ctx.world, kingdom_id.into(), (Kingdom { kingdom_id }));
        // set !(ctx.world, (kingdom_id, land_id).into(), (Land { kingdom_id }));

        (kingdom_id, player_id)
    }
}
