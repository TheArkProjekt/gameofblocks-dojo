#[system]
mod farm {
    use gameofblocks::components::kingdom::Kingdom;
    use dojo::world::Context;
    use traits::{Into, TryInto};
    use gameofblocks::components::land::{Land};
    use gameofblocks::components::resources::{Resource};

    fn execute(ctx: Context, kingdom_id: u32, land_id: u32) {
        let player_id: felt252 = ctx.origin.into();
        let (kingdom, land) = get !(ctx.world, (kingdom_id, land_id).into(), (Kingdom, Land));
    // assert(land.can_farm(), 'farm is not available');
    // let generated_resource = land.generate_resource();
    // set !(
    //     ctx.world,
    //     (player_id, resource_type).into(),
    //     (Resource {
    //         resource_type: generated_resource.resource_type,
    //         balance: generated_resource.resource_quantity
    //     })
    // );
    }
}
