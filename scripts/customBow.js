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

function displayEntityName(typeId) {
    let entityName = typeId.replace('minecraft:', '');
    entityName = entityName.replace('_v2', '');
    entityName = entityName.charAt(0).toUpperCase() + entityName.slice(1);
    return entityName;
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
            let victimName = victim.nameTag ? victim.nameTag : displayEntityName(victim.typeId);
            victimName = victimName.replace('_v2', '');
            victimName = victimName.replace('Ender_dragon', 'Ender Dragon');
            victimName = victimName.replace('Piglin_brute', 'Piglin Brute');
            victimName = victimName.replace('Zombie_pigman', 'Zombie Pigman');
            victimName = victimName.replace('Evocation_illager', 'Evoker');
            victimName = victimName.replace('Polar_bear', 'Polar Bear');
            victimName = victimName.replace('Skeleton_horse', 'Skeleton Horse');
            victimName = victimName.replace('Zombie_horse', 'Zombie Horse');
            victimName = victimName.replace('Wither_skeleton', 'Wither Skeleton');
            victimName = victimName.replace('Cave_spider', 'Cave Spider');
            victimName = victimName.replace('Elder_guardian', 'Elder Guardian');
            victimName = victimName.replace('Iron_golem', 'Iron Golem');
            victimName = victimName.replace('Magma_cube', 'Magma Cube');
            victimName = victimName.replace('Snow_golem', 'Snow Golem');
            victimName = victimName.replace('Zombie_villager', 'Zombie Villager');
            victimName = victimName.replace('Wandering_trader', 'Wandering Trader');
            victimName = victimName.replace('Glow_squid', 'Glow Squid');
            victimName = victimName.replace('Trader_llama', 'Trade Llama');

            if (health.currentValue > 0) {
                shooter?.sendMessage(`§9${victimName}'s HP: §c${health.currentValue.toFixed(2)}`);
            }
        }
    }
});