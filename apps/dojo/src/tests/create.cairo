use traits::{Into, TryInto};
use core::result::ResultTrait;
use array::{ArrayTrait, SpanTrait};
use option::OptionTrait;
use box::BoxTrait;
use clone::Clone;
use debug::PrintTrait;
use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
use dojo::test_utils::spawn_test_world;
use starknet::{ContractAddress, syscalls::deploy_syscall};
use gameofblocks::components::{kingdom};

fn spawn_kingdom() -> (ContractAddress, u32, felt252) {
    let mut components = array::ArrayTrait::new();
    // components.append(kingdom::TEST_CLASS_HASH);
    // components.append(player::TEST_CLASS_HASH);
    // components.append(location::TEST_CLASS_HASH);
    // components.append(risks::TEST_CLASS_HASH);
    // components.append(market::TEST_CLASS_HASH);
    // components.append(drug::TEST_CLASS_HASH);
    // components.append(name::TEST_CLASS_HASH);

    let mut systems = array::ArrayTrait::new();
    // systems.append(create_game::TEST_CLASS_HASH);
    // systems.append(join_game::TEST_CLASS_HASH);
    // systems.append(travel::TEST_CLASS_HASH);
    // systems.append(buy::TEST_CLASS_HASH);
    // systems.append(sell::TEST_CLASS_HASH);
    // systems.append(set_name::TEST_CLASS_HASH);

    let world = spawn_test_world(components, systems);

    let mut spawn_kingdom_calldata = array::ArrayTrait::<felt252>::new();

    let mut res = world.execute('create_kingdom'.into(), spawn_kingdom_calldata.span());
    let (kingdom_id, player_id) = serde::Serde::<(u32, felt252)>::deserialize(ref res)
        .expect('spawn deserialization failed');

    (world.contract_address, kingdom_id, player_id)
}

#[test]
#[available_gas(100000000)]
fn test_create() {
    let (world_address, kingdom_id, _) = spawn_kingdom();
}
