package com.blooddonation.controller;

import com.blooddonation.dto.DonorDto;
import com.blooddonation.model.BloodGroup;
import com.blooddonation.model.Donor;
import com.blooddonation.service.DonorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/donors")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class DonorController {

    private final DonorService donorService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Donor>> getAll() {
        return ResponseEntity.ok(donorService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Donor> getById(@PathVariable Long id) {
        return ResponseEntity.ok(donorService.getById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Donor> getByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(donorService.getByUserId(userId));
    }

    @GetMapping("/me")
    public ResponseEntity<Donor> getMyProfile(java.security.Principal principal) {
        return ResponseEntity.ok(donorService.getByEmail(principal.getName()));
    }

    @GetMapping("/bloodgroup/{bg}")
    public ResponseEntity<List<Donor>> getByBloodGroup(@PathVariable BloodGroup bg) {
        return ResponseEntity.ok(donorService.getByBloodGroup(bg));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Donor> create(@Valid @RequestBody DonorDto dto, @RequestParam Long userId) {
        return new ResponseEntity<>(donorService.create(dto, userId), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Donor> update(@PathVariable Long id, @Valid @RequestBody DonorDto dto) {
        return ResponseEntity.ok(donorService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        donorService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
