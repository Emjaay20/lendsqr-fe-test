// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { User, UserStatus } from '@/types/user';

// mock data generation utility for simulating user pool
const generateMockUsers = (count: number): User[] => {
    const orgs = ['Lendsqr', 'Lendstar', 'Irorun'];
    const statuses: UserStatus[] = ['Active', 'Inactive', 'Pending', 'Blacklisted'];
    const users: User[] = [];

    for (let i = 1; i <= count; i++) {
        users.push({
            id: i.toString(),
            organization: orgs[Math.floor(Math.random() * orgs.length)],
            username: `User_${i}`,
            email: `user${i}@example.com`,
            phoneNumber: `080${Math.floor(Math.random() * 100000000)}`,
            dateJoined: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
            status: statuses[Math.floor(Math.random() * statuses.length)],
            profile: {
                firstName: `First${i}`,
                lastName: `Last${i}`,
                bvn: `${Math.floor(Math.random() * 10000000000)}`,
                gender: i % 2 === 0 ? 'Male' : 'Female',
                maritalStatus: 'Single',
                children: 'None',
                typeOfResidence: 'Apartment',
            },
            educationAndEmployment: {
                level: 'B.Sc',
                employmentStatus: 'Employed',
                sector: 'FinTech',
                duration: '2 years',
                officeEmail: `office${i}@company.com`,
                monthlyIncome: ['₦200,000', '₦400,000'],
                loanRepayment: '₦40,000',
            },
            socials: {
                twitter: `@user_${i}`,
                facebook: `User ${i}`,
                instagram: `@user_${i}_insta`,
            },
            guarantor: {
                firstName: `Guarantor${i}`,
                lastName: `Last`,
                phoneNumber: `070${Math.floor(Math.random() * 100000000)}`,
                email: `guarantor${i}@example.com`,
                relationship: 'Sibling',
            },
            personalIncome: `₦${(Math.floor(Math.random() * 900) + 100)},000.00`,
        });
    }
    return users;
};

export async function GET() {
    const users = generateMockUsers(500);
    return NextResponse.json(users);
}
