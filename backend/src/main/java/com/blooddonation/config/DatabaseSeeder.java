package com.blooddonation.config;

import com.blooddonation.model.BloodGroup;
import com.blooddonation.model.BloodInventory;
import com.blooddonation.repository.BloodInventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    private final BloodInventoryRepository inventoryRepository;

    @Override
    public void run(String... args) throws Exception {
        for (BloodGroup group : BloodGroup.values()) {
            if (inventoryRepository.findByBloodGroup(group).isEmpty()) {
                inventoryRepository.save(
                        BloodInventory.builder()
                                .bloodGroup(group)
                                .unitsAvailable(0)
                                .build()
                );
            }
        }
    }
}
