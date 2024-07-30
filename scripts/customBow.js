/**
* Project: Better Bow
* Organization: Serenity SMP
* Date: 2024-06-13
* Submitted: 2024-06-22
* 
* ============================================================================
*   ___      _   _             ___                
*  | _ ) ___| |_| |_ ___ _ _  | _ ) _____ __ _____
*  | _ \/ -_)  _|  _/ -_) '_| | _ \/ _ \ V  V (_-<
*  |___/\___|\__|\__\___|_|   |___/\___/\_/\_//__/
*                                                 
*  
*  Developed by: BatemanCodes
* ============================================================================
* 
* WARNING: This project is protected by copyright law. 
* Unauthorized modification, redistribution, or alteration of download links 
* for monetary gain is strictly prohibited. Violators will face legal action.
* 
* License: This work is licensed under a Creative Commons 
* Attribution-NonCommercial 4.0 International License.
* To view a copy of this license, visit:
* http://creativecommons.org/licenses/by-nc/4.0/
* 
* Should you have concerns or suggestions, feel free to contact me.
* Discord: @itstheamericanpsycho
*/

import { EntityComponentTypes, world } from '@minecraft/server';

const entityNameMap = {
    'ender_dragon': 'Ender Dragon',
    'piglin_brute': 'Piglin Brute',
    'zombie_pigman': 'Zombie Pigman',
    'evocation_illager': 'Evoker',
    'polar_bear': 'Polar Bear',
    'skeleton_horse': 'Skeleton Horse',
    'zombie_horse': 'Zombie Horse',
    'wither_skeleton': 'Wither Skeleton',
    'cave_spider': 'Cave Spider',
    'elder_guardian': 'Elder Guardian',
    'iron_golem': 'Iron Golem',
    'magma_cube': 'Magma Cube',
    'snow_golem': 'Snow Golem',
    'zombie_villager': 'Zombie Villager',
    'wandering_trader': 'Wandering Trader',
    'glow_squid': 'Glow Squid',
    'trader_llama': 'Trader Llama'
};

function capitalizeWords(str) {
    return str.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
}

function formatEntityName(name) {
    name = name.replace('_v2', '').toLowerCase();
    return entityNameMap[name] || capitalizeWords(name.replace(/_/g, ' '));
}

world.afterEvents.projectileHitEntity.subscribe((data) => {
    const shooter = data.source;
    const victim = data.getEntityHit().entity;
    const health = victim?.getComponent(EntityComponentTypes.Health);
    const mainhandItem = shooter?.getComponent('minecraft:equippable')?.getEquipment('Mainhand');

    if (shooter?.typeId !== "minecraft:player")
        return;

    if (shooter?.typeId === "minecraft:player" && mainhandItem?.typeId === "minecraft:bow") {
        shooter?.runCommandAsync(`playsound random.orb @s`);

        if (victim.typeId === "minecraft:player") {
            shooter?.sendMessage(`§9${victim.name}'s HP: §c${health.currentValue.toFixed(2)}`);
        } else {
            let victimName = victim.nameTag || formatEntityName(victim.typeId.replace('minecraft:', ''));
            if (health.currentValue > 0) {
                shooter?.sendMessage(`§9${victimName}'s HP: §c${health.currentValue.toFixed(2)}`);
            }
        }
    }
});
