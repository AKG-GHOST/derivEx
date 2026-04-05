#include<stdio.h>

int main(){
    int i,a[],n,j,t;
    printf("enter n:");
    scanf("%d",&n);
    printf("enter elements:");
    for(i=0;i<n;i++){
        scanf("%d",&a[i]);
    }
    for(i=0;i<n-1;i++){
        for(j=0;j<n-1-i;j++){
            if(a[j]>a[j+1]){
                t=a[j];
                a[j]=a[j+1];
                a[j+1]=t;
            }
        }
    }
    printf("sorted elements:");
    for(i=0;i<n;i++){
        printf("%d ",a[i]);
    }
    return 0;
}