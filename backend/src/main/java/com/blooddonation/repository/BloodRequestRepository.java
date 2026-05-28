package com.blooddonation.repository;

import com.blooddonation.model.BloodRequest;
import com.blooddonation.model.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BloodRequestRepository extends JpaRepository<BloodRequest, Long> {
    List<BloodRequest> findByStatus(RequestStatus status);
}
