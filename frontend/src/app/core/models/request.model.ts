export interface BloodRequest {
  id: number;
  requesterName: string;
  bloodGroup: string;
  units: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

export interface BloodRequestDto {
  requesterName: string;
  bloodGroup: string;
  units: number;
}
