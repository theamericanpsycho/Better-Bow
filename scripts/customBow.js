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


import * as bc from '@minecraft/server';

function capitalizeWords(str) {
    return str.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
}

function formatEntityName(name) {
    name = name.replace('minecraft:', '').replace('_v2', '').replace(/_/g, ' ');
    return capitalizeWords(name);
}

bc.world.afterEvents.projectileHitEntity.subscribe((data) => {
    const shooter = data.source;
    const victim = data.getEntityHit().entity;
    const health = victim?.getComponent(bc.EntityComponentTypes.Health);
    const mainhandItem = shooter?.getComponent('minecraft:equippable')?.getEquipment('Mainhand');

    if (shooter?.typeId !== "minecraft:player")
        return;

    if (shooter?.typeId === "minecraft:player" && mainhandItem?.typeId === "minecraft:bow") {
        shooter?.playSound(`random.orb`);

        if (victim.typeId === "minecraft:player") {
            shooter?.sendMessage(`§9${victim.name}'s HP: §c${health.currentValue.toFixed(2)}`);
        } else {
            let victimName = victim.nameTag || formatEntityName(victim.typeId);
            if (health.currentValue > 0) {
                shooter?.sendMessage(`§9${victimName}'s HP: §c${health.currentValue.toFixed(2)}`);
            }
        }
    }
});
