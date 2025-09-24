import ResumeLayout from '../../layout/ResumeLayout';
import ResumeParsing from './ResumeParsing';

export default {
  title: 'ResumeParsing',
  component: ResumeParsing,
};

export const Default = () => (
  <ResumeLayout>
    <ResumeParsing
      onUploadFile={async () =>
        'https://moonshot-assets.s3.us-west-2.amazonaws.com/generated/b6eb137bbbebeeee91ddd1f21cb48c7abfdea733429eed4d6794c11f5275c97f?AWSAccessKeyId=ASIAY7MGLG6ZLWUG3IK6&Expires=1758706988&Signature=uYwa4d32XM1DbgZPfAj3gJr2%2BCM%3D&x-amz-security-token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBkkDWXOsrVYz2piBc%2BV0Kx%2B4%2BUbOAo1nAJC2rFFcYqGAiEAzQfqnnLtu9PoBhoB8K%2BCG0aaw8eZcixjIJ%2Bw1gWb4kkq9wMIWhADGgw2MTcxNDY0MzE0MTAiDEa1dsaJMDUizC2GLSrUAxSe4anKdSU0jR8JadLySK9lBlMADzOH1GuIdoDQFykeU504OoYuPBa5wxzsnPdf2E1fGaWoQDgf6ehOH6k%2BzeSZmpZXJRfxIh0lyLR5%2Fiph7JT0BAV96l1kdP4nqH%2FQQh%2FHHl%2FXQdd8y6RVKYSw0Uf0v2oWDrrcfYasV8LoGVfNZ3pz8RmP0PzIvZwGztcWg4iytyOfDwtjgA6xTnJwL9S22FwFBhRqrwtrlPpog3j1jqu30K0DV4FNs9QL5pJjJOxLHDc7H%2BOG90P0%2Ff9ysrx0cawUi7mBfBVZM7yE8ogkv2QICtmEUWtTXE05YWue141LttHHxQ5g7tXB5VIB%2BRuP4c88HACuIQ75y8khW8CVV4eiwKzAAJXy33oVP1kgIE%2F7PG6tj8GvELCUu2NA2zp0s3sgAX7x7P5QNgdCGor9zeuVhZjFkIuB6z5D2sM9ISrL3FoXEAwia0i2Y03BINAF0IoiGS8ptDMBsCMm1%2BjzR%2BV22ILSzxTzgLPOAqUih%2FZdTOJaUJzMii%2BCy9zVH%2BT3zQmcVuga4hhg3SJYwQujemY3dNmkdqwEcY7kK5Bt5TDHajWrS%2FVh8oS8Oz8esZ9sX2goiM45thw2fRS%2BH8Zxr8PcFzDx2c7GBjqlATm934OX%2FZYz2qlNm%2F30zz8mhWT6iEnu1rgc1EHqoofeo3e0CaNEwO3ukonOMUX9q6qBXvpK97zvNrcUTcgfdXunbGV%2FqrzZAYCwCK2C0Wjg0TjhwkfQd%2BHAR3Ajd1ajPATjCTuk4bteHu%2BKJnrxYeIFzaHhBzxr5WvCrTA7jWVib%2Fp37D63ejJcT4nMxSqzESRQcx3atjsEk5LxrcQ0lGRpy%2FikOg%3D%3D'
      }
    />
  </ResumeLayout>
);
