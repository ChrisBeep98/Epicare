"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { asset } from "@/lib/asset";

// ----------------------------------------------------------------------
// LOGO COMPONENTS (Moved to top to prevent Turbopack ReferenceErrors)
// ----------------------------------------------------------------------
function CrmLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 192 73" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_2170_4274)">
        <g clipPath="url(#clip1_2170_4274)">
          <path d="M144.984 50.7739H142.714V54.8659H145.004C145.774 54.8659 146.344 54.6759 146.716 54.2979C147.088 53.9199 147.274 53.4159 147.274 52.7899C147.274 52.1639 147.092 51.6879 146.726 51.3219C146.36 50.9559 145.78 50.7739 144.984 50.7739Z" fill="currentColor"/>
          <path d="M166.592 43.738H124.83C122.552 53.58 115.744 61.698 106.724 65.774H172.314V49.46C172.314 46.3 169.752 43.738 166.592 43.738ZM129.07 57.812C129.37 58.498 129.804 59.026 130.372 59.398C130.94 59.77 131.622 59.956 132.418 59.956C133.28 59.956 133.97 59.77 134.492 59.398C135.014 59.026 135.36 58.508 135.53 57.842H138.544C138.282 59.264 137.618 60.384 136.548 61.2C135.478 62.016 134.114 62.424 132.458 62.424C131.088 62.424 129.906 62.128 128.914 61.534C127.922 60.94 127.158 60.112 126.624 59.048C126.088 57.984 125.822 56.754 125.822 55.358C125.822 53.962 126.09 52.728 126.624 51.658C127.158 50.588 127.922 49.752 128.914 49.152C129.906 48.552 131.086 48.252 132.458 48.252C134.116 48.252 135.478 48.67 136.548 49.504C137.618 50.34 138.284 51.514 138.544 53.028H135.53C135.374 52.296 135.03 51.732 134.502 51.334C133.974 50.936 133.278 50.736 132.418 50.736C131.622 50.736 130.94 50.922 130.372 51.294C129.804 51.666 129.37 52.198 129.07 52.89C128.77 53.582 128.62 54.404 128.62 55.356C128.62 56.308 128.77 57.128 129.07 57.812ZM147.058 62.186L144.578 56.862H142.712V62.186H139.972V48.484H145.16C146.268 48.484 147.186 48.674 147.91 49.052C148.634 49.43 149.176 49.936 149.534 50.57C149.892 51.202 150.072 51.91 150.072 52.694C150.072 53.426 149.898 54.11 149.554 54.75C149.208 55.39 148.67 55.902 147.938 56.286C147.77 56.374 147.59 56.45 147.4 56.518L150.188 62.188H147.056H147.058V62.186ZM166.358 62.186H163.618V53.122L160.074 60.266H157.902L154.34 53.122V62.186H151.6V48.484H154.888L159.018 56.92L163.09 48.484H166.36V62.186H166.358Z" fill="currentColor"/>
          <path d="M93.4722 7.02612C78.1922 7.02612 65.6362 18.6801 64.2002 33.5841H77.6382C78.9862 26.0581 85.5602 20.3461 93.4742 20.3461C102.362 20.3461 109.568 27.5521 109.568 36.4401C109.568 45.3281 102.362 52.5341 93.4742 52.5341C88.2002 52.5341 83.5222 49.9941 80.5882 46.0741V62.8801C84.4802 64.7821 88.8502 65.8541 93.4742 65.8541C109.718 65.8541 122.888 52.6861 122.888 36.4401C122.888 20.1941 109.718 7.02612 93.4722 7.02612Z" className="fill-[#2E3438] dark:fill-[var(--color-text-White-100)] transition-colors duration-500" />
          <path d="M27.8141 20.8321C29.4501 24.6321 31.6981 28.0041 34.3881 30.6781C36.6981 24.6321 42.5501 20.3341 49.4101 20.3341C54.8261 20.3341 59.6141 23.0161 62.5281 27.1201C63.8801 22.6021 66.1901 18.4961 69.2221 15.0341C63.9601 10.0741 56.8741 7.02612 49.0721 7.02612C41.2701 7.02612 34.1321 10.0941 28.8641 15.0881C28.7381 15.2321 28.6041 15.3801 28.4561 15.5361C26.9941 17.0881 27.1901 19.0641 27.8141 20.8301V20.8321Z" fill="currentColor"/>
          <path d="M78.418 37.484H50.206V46.982H61.514C58.568 50.354 54.242 52.49 49.41 52.49C40.53 52.49 33.332 45.292 33.332 36.412C33.332 35.338 33.44 34.29 33.64 33.276C29.834 29.848 26.656 25.326 24.648 20.072C21.516 24.744 19.686 30.364 19.686 36.412C19.686 52.642 32.842 65.798 49.072 65.798C56.362 65.798 63.026 63.138 68.16 58.742L68.918 58.182V65.696H78.416V37.748C78.42 37.66 78.428 37.572 78.432 37.484H78.416H78.418Z" fill="currentColor"/>
          <path d="M130.372 51.294C130.94 50.922 131.622 50.736 132.418 50.736C133.28 50.736 133.974 50.936 134.502 51.334C135.03 51.732 135.374 52.296 135.53 53.028H138.544C138.282 51.514 137.618 50.34 136.548 49.504C135.478 48.67 134.114 48.252 132.458 48.252C131.088 48.252 129.906 48.552 128.914 49.152C127.922 49.752 127.158 50.5879 126.624 51.6579C126.088 52.728 125.822 53.9619 125.822 55.3579C125.822 56.754 126.09 57.984 126.624 59.048C127.158 60.112 127.922 60.94 128.914 61.534C129.906 62.128 131.086 62.424 132.458 62.424C134.116 62.424 135.478 62.016 136.548 61.2C137.618 60.384 138.284 59.266 138.544 57.842H135.53C135.36 58.508 135.014 59.026 134.492 59.398C133.97 59.77 133.278 59.956 132.418 59.956C131.622 59.956 130.94 59.77 130.372 59.398C129.804 59.026 129.37 58.498 129.07 57.812C128.77 57.126 128.62 56.308 128.62 55.356C128.62 54.404 128.77 53.582 129.07 52.89C129.37 52.198 129.804 51.666 130.372 51.294Z" className="fill-white transition-colors duration-500" />
          <path d="M147.94 56.2859C148.67 55.9019 149.208 55.3879 149.556 54.7499C149.902 54.1099 150.074 53.4259 150.074 52.6939C150.074 51.9119 149.894 51.2039 149.536 50.5699C149.176 49.9379 148.636 49.4319 147.912 49.0519C147.188 48.6739 146.27 48.4839 145.162 48.4839H139.974V62.1859H142.714V56.8619H144.58L147.06 62.1859H150.192L147.404 56.5159C147.592 56.4479 147.774 56.3719 147.942 56.2839H147.94V56.2859ZM142.714 50.7739H144.984C145.78 50.7739 146.36 50.9579 146.726 51.3219C147.092 51.6859 147.274 52.1759 147.274 52.7899C147.274 53.4039 147.088 53.9179 146.716 54.2979C146.344 54.6759 145.772 54.8659 145.004 54.8659H142.714V50.7739Z" className="fill-white transition-colors duration-500" />
          <path d="M163.09 48.4839L159.018 56.9219L154.888 48.4839H151.6V62.1859H154.34V53.1239L157.902 60.2679H160.074L163.618 53.1239V62.1859H166.358V48.4839H163.09Z" className="fill-white transition-colors duration-500" />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_2170_4296">
          <rect width="192" height="72.88" fill="white"/>
        </clipPath>
        <clipPath id="clip1_2170_4296">
          <rect width="192" height="72.88" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}

function AmsLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 192 73" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_2170_4296)">
        <g clipPath="url(#clip1_2170_4296)">
          <path d="M130.622 56.9801H134.354L132.492 51.5981L130.622 56.9801Z" fill="currentColor"/>
          <path d="M166.592 43.738H124.83C122.552 53.58 115.744 61.698 106.724 65.774H172.314V49.46C172.314 46.3 169.752 43.738 166.592 43.738ZM136.154 62.188L135.092 59.114H129.882L128.814 62.188H125.956L130.948 48.486H134.06L139.052 62.188H136.154ZM154.788 62.188H152.048V53.124L148.504 60.268H146.332L142.77 53.124V62.188H140.03V48.486H143.318L147.448 56.922L151.52 48.486H154.79V62.188H154.788ZM165.73 60.358C165.352 60.978 164.804 61.476 164.086 61.856C163.368 62.234 162.48 62.424 161.424 62.424C160.432 62.424 159.548 62.254 158.772 61.916C157.996 61.576 157.378 61.08 156.922 60.428C156.466 59.776 156.23 58.986 156.218 58.06H159.114C159.128 58.452 159.228 58.804 159.418 59.116C159.608 59.43 159.872 59.678 160.21 59.86C160.548 60.044 160.948 60.134 161.404 60.134C161.808 60.134 162.158 60.068 162.452 59.938C162.746 59.808 162.974 59.624 163.138 59.39C163.302 59.156 163.382 58.868 163.382 58.528C163.382 58.162 163.288 57.85 163.098 57.588C162.908 57.328 162.65 57.106 162.324 56.922C161.998 56.74 161.622 56.574 161.198 56.422C160.774 56.272 160.32 56.118 159.838 55.962C158.754 55.61 157.93 55.14 157.362 54.552C156.794 53.964 156.51 53.182 156.51 52.202C156.51 51.368 156.708 50.656 157.106 50.068C157.504 49.48 158.058 49.03 158.77 48.718C159.482 48.404 160.286 48.248 161.188 48.248C162.09 48.248 162.93 48.408 163.634 48.728C164.338 49.048 164.896 49.508 165.308 50.108C165.718 50.708 165.938 51.42 165.964 52.242H163.028C163.014 51.942 162.93 51.664 162.774 51.41C162.618 51.156 162.402 50.95 162.128 50.794C161.854 50.638 161.528 50.56 161.15 50.56C160.824 50.548 160.526 50.596 160.26 50.706C159.992 50.816 159.78 50.98 159.624 51.196C159.468 51.412 159.39 51.682 159.39 52.008C159.39 52.334 159.468 52.606 159.624 52.82C159.78 53.036 159.998 53.222 160.28 53.378C160.56 53.534 160.89 53.682 161.268 53.818C161.646 53.954 162.058 54.096 162.502 54.238C163.194 54.472 163.826 54.75 164.4 55.07C164.974 55.39 165.434 55.804 165.78 56.312C166.126 56.82 166.298 57.494 166.298 58.328C166.298 59.06 166.108 59.734 165.73 60.354V60.358Z" fill="currentColor"/>
          <path d="M93.4722 7.02612C78.1922 7.02612 65.6362 18.6801 64.2002 33.5841H77.6382C78.9862 26.0581 85.5602 20.3461 93.4742 20.3461C102.362 20.3461 109.568 27.5521 109.568 36.4401C109.568 45.3281 102.362 52.5341 93.4742 52.5341C88.2002 52.5341 83.5222 49.9941 80.5882 46.0741V62.8801C84.4802 64.7821 88.8502 65.8541 93.4742 65.8541C109.718 65.8541 122.888 52.6861 122.888 36.4401C122.888 20.1941 109.72 7.02612 93.4742 7.02612H93.4722Z" className="fill-[#2E3438] dark:fill-[var(--color-text-White-100)] transition-colors duration-500" />
          <path d="M27.8141 20.8321C29.4501 24.6321 31.6981 28.0041 34.3881 30.6781C36.6981 24.6321 42.5501 20.3341 49.4101 20.3341C54.8261 20.3341 59.6141 23.0161 62.5281 27.1201C63.8801 22.6021 66.1901 18.4961 69.2221 15.0341C63.9601 10.0741 56.8741 7.02612 49.0721 7.02612C41.2701 7.02612 34.1321 10.0941 28.8641 15.0881C28.7381 15.2321 28.6041 15.3801 28.4561 15.5361C26.9941 17.0881 27.1901 19.0641 27.8141 20.8301V20.8321Z" fill="currentColor"/>
          <path d="M78.418 37.484H50.206V46.982H61.514C58.568 50.354 54.242 52.49 49.41 52.49C40.53 52.49 33.332 45.292 33.332 36.412C33.332 35.338 33.44 34.29 33.64 33.276C29.834 29.848 26.656 25.326 24.648 20.072C21.516 24.744 19.686 30.364 19.686 36.412C19.686 52.642 32.842 65.798 49.072 65.798C56.362 65.798 63.026 63.138 68.16 58.742L68.918 58.182V65.696H78.416V37.748C78.42 37.66 78.428 37.572 78.432 37.484H78.416H78.418Z" fill="currentColor"/>
          <path d="M130.946 48.478L125.954 62.18H128.812L129.88 59.106H135.09L136.152 62.18H139.05L134.058 48.478H130.946ZM130.622 56.972L132.492 51.588L134.352 56.972H130.62H130.622Z" className="fill-white transition-colors duration-500" />
          <path d="M147.448 56.914L143.318 48.478H140.03V62.18H142.77V53.116L146.332 60.262H148.504L152.048 53.116V62.18H154.788V48.478H151.52L147.448 56.914Z" className="fill-white transition-colors duration-500" />
          <path d="M165.78 56.3081C165.434 55.8001 164.974 55.3841 164.4 55.0661C163.826 54.7461 163.192 54.4681 162.502 54.2341C162.058 54.0901 161.648 53.9501 161.268 53.8141C160.89 53.6761 160.56 53.5301 160.28 53.3741C160 53.2181 159.78 53.0321 159.624 52.8161C159.468 52.6001 159.39 52.3301 159.39 52.0041C159.39 51.6781 159.468 51.4081 159.624 51.1921C159.78 50.9761 159.992 50.8141 160.26 50.7021C160.528 50.5921 160.824 50.5421 161.15 50.5561C161.528 50.5561 161.854 50.6341 162.128 50.7901C162.402 50.9461 162.618 51.1521 162.774 51.4061C162.93 51.6601 163.016 51.9381 163.028 52.2381H165.964C165.938 51.4161 165.72 50.7041 165.308 50.1041C164.896 49.5041 164.34 49.0441 163.634 48.7241C162.93 48.4041 162.114 48.2441 161.188 48.2441C160.262 48.2441 159.482 48.4001 158.77 48.7141C158.058 49.0281 157.504 49.4781 157.106 50.0641C156.708 50.6521 156.51 51.3641 156.51 52.1981C156.51 53.1761 156.794 53.9601 157.362 54.5481C157.93 55.1361 158.754 55.6041 159.838 55.9581C160.32 56.1141 160.774 56.2681 161.198 56.4181C161.622 56.5681 161.998 56.7341 162.324 56.9181C162.65 57.1021 162.908 57.3221 163.098 57.5841C163.288 57.8461 163.382 58.1581 163.382 58.5241C163.382 58.8641 163.3 59.1501 163.138 59.3861C162.974 59.6201 162.746 59.8041 162.452 59.9341C162.158 60.0641 161.81 60.1301 161.404 60.1301C160.946 60.1301 160.548 60.0381 160.21 59.8561C159.87 59.6741 159.606 59.4261 159.418 59.1121C159.228 58.7981 159.128 58.4461 159.114 58.0561H156.218C156.23 58.9821 156.466 59.7721 156.922 60.4241C157.378 61.0761 157.996 61.5721 158.772 61.9121C159.548 62.2501 160.432 62.4201 161.424 62.4201C162.48 62.4201 163.368 62.2301 164.086 61.8521C164.804 61.4741 165.352 60.9741 165.73 60.3541C166.108 59.7341 166.298 59.0581 166.298 58.3281C166.298 57.4941 166.124 56.8201 165.78 56.3121V56.3081Z" className="fill-white transition-colors duration-500" />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_2170_4296">
          <rect width="192" height="72.88" fill="white"/>
        </clipPath>
        <clipPath id="clip1_2170_4296">
          <rect width="192" height="72.88" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}

function CallsLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 192 73" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_2170_4318)">
        <g clipPath="url(#clip1_2170_4318)">
          <path d="M178.61 49.46C178.61 46.3 176.048 43.738 172.888 43.738H118.536C116.258 53.58 109.45 61.698 100.43 65.774H178.61V49.46Z" fill="currentColor"/>
          <path d="M87.1783 7.02612C71.8983 7.02612 59.3422 18.6801 57.9062 33.5841H71.3443C72.6923 26.0581 79.2662 20.3461 87.1803 20.3461C96.0682 20.3461 103.274 27.5521 103.274 36.4401C103.274 45.3281 96.0682 52.5341 87.1803 52.5341C81.9062 52.5341 77.2283 49.9941 74.2943 46.0741V62.8801C78.1863 64.7821 82.5562 65.8541 87.1803 65.8541C103.424 65.8541 116.594 52.6861 116.594 36.4401C116.594 20.1941 103.426 7.02612 87.1803 7.02612H87.1783Z" className="fill-[#2E3438] dark:fill-[var(--color-text-White-100)] transition-colors duration-500" />
          <path d="M21.5202 20.8321C23.1562 24.6321 25.4042 28.0041 28.0942 30.6781C30.4042 24.6321 36.2562 20.3341 43.1162 20.3341C48.5322 20.3341 53.3202 23.0161 56.2342 27.1201C57.5862 22.6021 59.8962 18.4961 62.9282 15.0341C57.6662 10.0741 50.5802 7.02612 42.7782 7.02612C34.9762 7.02612 27.8382 10.0941 22.5702 15.0881C22.4442 15.2321 22.3102 15.3801 22.1622 15.5361C20.7002 17.0881 20.8962 19.0641 21.5202 20.8301V20.8321Z" fill="currentColor"/>
          <path d="M72.1221 37.484H43.9101V46.982H55.2181C52.2721 50.354 47.9461 52.49 43.1141 52.49C34.2341 52.49 27.0361 45.292 27.0361 36.412C27.0361 35.338 27.1441 34.29 27.3441 33.276C23.5381 29.848 20.3601 25.326 18.3521 20.072C15.2201 24.744 13.3901 30.364 13.3901 36.412C13.3901 52.642 26.5461 65.798 42.7761 65.798C50.0661 65.798 56.7301 63.138 61.8641 58.742L62.6221 58.182V65.696H72.1201V37.748C72.1241 37.66 72.1321 37.572 72.1361 37.484H72.1201H72.1221Z" fill="currentColor"/>
          <path d="M125.748 61.4519C124.46 61.4519 123.352 61.1739 122.42 60.6159C121.488 60.0579 120.772 59.2799 120.268 58.2799C119.766 57.2819 119.514 56.1259 119.514 54.8139C119.514 53.5019 119.766 52.3439 120.268 51.3379C120.77 50.3319 121.488 49.5479 122.42 48.9839C123.352 48.4199 124.462 48.1379 125.748 48.1379C127.304 48.1379 128.586 48.5299 129.59 49.3139C130.596 50.0979 131.22 51.2019 131.466 52.6239H128.634C128.486 51.9379 128.166 51.4079 127.668 51.0339C127.172 50.6599 126.518 50.4739 125.71 50.4739C124.962 50.4739 124.322 50.6479 123.788 50.9979C123.254 51.3479 122.846 51.8479 122.566 52.4959C122.284 53.1459 122.144 53.9179 122.144 54.8119C122.144 55.7059 122.284 56.4759 122.566 57.1199C122.848 57.7639 123.256 58.2599 123.788 58.6099C124.322 58.9599 124.962 59.1339 125.71 59.1339C126.518 59.1339 127.168 58.9599 127.66 58.6099C128.15 58.2599 128.476 57.7739 128.634 57.1479H131.466C131.22 58.4839 130.596 59.5359 129.59 60.3019C128.584 61.0679 127.304 61.4519 125.748 61.4519Z" className="fill-white transition-colors duration-500" />
          <path d="M131.854 61.2319L136.542 48.3599H139.466L144.154 61.2319H141.432L137.994 51.2839L134.538 61.2319H131.854ZM133.912 58.3459L134.592 56.3419H141.212L141.874 58.3459H133.912Z" className="fill-white transition-colors duration-500" />
          <path d="M145.074 61.2319V48.3599H147.648V59.2259H153.274V61.2299H145.074V61.2319Z" className="fill-white transition-colors duration-500" />
          <path d="M154.672 61.2319V48.3599H157.246V59.2259H162.872V61.2299H154.672V61.2319Z" className="fill-white transition-colors duration-500" />
          <path d="M168.186 61.4519C167.254 61.4519 166.424 61.2919 165.694 60.9739C164.964 60.6559 164.386 60.1899 163.956 59.5759C163.526 58.9639 163.306 58.2219 163.294 57.3519H166.016C166.028 57.7199 166.124 58.0499 166.3 58.3439C166.478 58.6379 166.726 58.8719 167.044 59.0419C167.362 59.2139 167.736 59.2999 168.166 59.2999C168.546 59.2999 168.874 59.2379 169.15 59.1159C169.426 58.9939 169.64 58.8219 169.794 58.6019C169.948 58.3819 170.024 58.1119 170.024 57.7919C170.024 57.4499 169.934 57.1539 169.758 56.9099C169.58 56.6639 169.338 56.4559 169.032 56.2839C168.726 56.1119 168.374 55.9559 167.974 55.8159C167.576 55.6759 167.15 55.5319 166.696 55.3839C165.678 55.0539 164.904 54.6119 164.37 54.0599C163.836 53.5079 163.57 52.7719 163.57 51.8539C163.57 51.0699 163.756 50.4019 164.13 49.8499C164.504 49.2979 165.024 48.8759 165.692 48.5819C166.36 48.2879 167.116 48.1399 167.962 48.1399C168.808 48.1399 169.598 48.2899 170.26 48.5899C170.922 48.8899 171.446 49.3219 171.832 49.8859C172.218 50.4499 172.424 51.1179 172.448 51.8899H169.69C169.678 51.6079 169.598 51.3479 169.452 51.1079C169.304 50.8679 169.102 50.6759 168.846 50.5279C168.59 50.3799 168.282 50.3079 167.926 50.3079C167.62 50.2959 167.34 50.3419 167.09 50.4459C166.838 50.5499 166.64 50.7039 166.492 50.9059C166.344 51.1079 166.272 51.3619 166.272 51.6699C166.272 51.9779 166.346 52.2299 166.492 52.4339C166.64 52.6359 166.844 52.8099 167.108 52.9579C167.372 53.1059 167.68 53.2419 168.036 53.3719C168.392 53.4999 168.778 53.6319 169.194 53.7679C169.844 53.9879 170.438 54.2499 170.978 54.5499C171.518 54.8499 171.95 55.2399 172.274 55.7179C172.598 56.1959 172.762 56.8279 172.762 57.6119C172.762 58.2979 172.584 58.9339 172.228 59.5159C172.872 60.0979 171.358 60.5679 170.684 60.9219C170.01 61.2779 169.176 61.4559 168.184 61.4559L168.186 61.4519Z" className="fill-white transition-colors duration-500" />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_2170_4318">
          <rect width="192" height="72.88" fill="white"/>
        </clipPath>
        <clipPath id="clip1_2170_4318">
          <rect width="192" height="72.88" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}

const ArrowUR = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
    strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"
  >
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
);

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------
export default function BentoGridEpicare() {
  const t = useTranslations('landingV2.bento');
  const th = useTranslations('landingV2.hero');
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const section = containerRef.current;
    const track = trackRef.current;
    const cards = gsap.utils.toArray('.coverflow-card');
    
    if (!section || !track || cards.length === 0) return;

    let mm = gsap.matchMedia();

    // ----------------------------------------------------
    // DESKTOP: HORIZONTAL 3D COVER FLOW
    // ----------------------------------------------------
    mm.add("(min-width: 768px)", () => {
        let cardStaticCenters: number[] = [];

        const calculateLayout = () => {
           gsap.set(track, { clearProps: "all" });
           cards.forEach((c: any) => gsap.set(c, { clearProps: "all" }));

           const firstCard = cards[0] as HTMLElement;
           const lastCard = cards[cards.length - 1] as HTMLElement;
           const padLeft = (window.innerWidth - firstCard.offsetWidth) / 2;
           const padRight = (window.innerWidth - lastCard.offsetWidth) / 2;
           
           gsap.set(track, { paddingLeft: padLeft, paddingRight: padRight });

           cardStaticCenters = cards.map(card => {
               const el = card as HTMLElement;
               return el.offsetLeft + el.offsetWidth / 2;
           });
        };

        calculateLayout();

        const getScrollDist = () => track.scrollWidth - window.innerWidth;
        
        const updateCards3DPhysics = () => {
            const currentTrackX = gsap.getProperty(track, "x") as number;
            const screenCenter = window.innerWidth / 2;

            cards.forEach((card: any, i) => {
              const cardCenter = currentTrackX + cardStaticCenters[i];
              const dist = (cardCenter - screenCenter) / screenCenter; 
              const clampedDist = Math.max(-1, Math.min(1, dist));
              
              gsap.set(card, {
                rotateY: clampedDist * 50, 
                scale: 1 - Math.abs(clampedDist) * 0.25, 
                z: -Math.abs(clampedDist) * 500, 
                opacity: Math.max(0, 1 - Math.abs(clampedDist) * 1.5), 
              });
            });
        };

        updateCards3DPhysics();

        const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              pin: true,
              scrub: 1.2,
              start: "top top",
              end: () => "+=" + getScrollDist(),
              invalidateOnRefresh: true,
              onRefresh: () => {
                 calculateLayout();
                 updateCards3DPhysics();
              }
            }
        });

        tl.to(track, {
            x: () => -getScrollDist(),
            ease: "none",
            onUpdate: updateCards3DPhysics
        }, 0);

        const progressBar = progressBarRef.current;
        if (progressBar) {
            gsap.set(progressBar, { transformOrigin: "left center" });
            tl.to(progressBar, { scaleX: 1, ease: "none" }, 0);
        }

        return () => {
            gsap.set(track, { clearProps: "all" });
            cards.forEach((c: any) => gsap.set(c, { clearProps: "all" }));
        };
    });

    // ----------------------------------------------------
    // MOBILE: VERTICAL 3D ROLODEX (COVER FLOW)
    // ----------------------------------------------------
    mm.add("(max-width: 767px)", () => {
        let cardStaticCenters: number[] = [];

        const calculateLayout = () => {
           gsap.set(track, { clearProps: "all" });
           cards.forEach((c: any) => gsap.set(c, { clearProps: "all" }));

           const firstCard = cards[0] as HTMLElement;
           const lastCard = cards[cards.length - 1] as HTMLElement;
           const padTop = (window.innerHeight - firstCard.offsetHeight) / 2;
           const padBottom = (window.innerHeight - lastCard.offsetHeight) / 2;
           
           gsap.set(track, { paddingTop: padTop, paddingBottom: padBottom });

           cardStaticCenters = cards.map(card => {
               const el = card as HTMLElement;
               return el.offsetTop + el.offsetHeight / 2;
           });
        };

        calculateLayout();

        const getScrollDist = () => track.scrollHeight - window.innerHeight;
        
        const updateCards3DPhysics = () => {
            const currentTrackY = gsap.getProperty(track, "y") as number;
            const screenCenter = window.innerHeight / 2;

            cards.forEach((card: any, i) => {
              const cardCenter = currentTrackY + cardStaticCenters[i];
              const dist = (cardCenter - screenCenter) / screenCenter; 
              const clampedDist = Math.max(-1, Math.min(1, dist));
              
              gsap.set(card, {
                rotateX: -clampedDist * 50, // Pitch for vertical 3D
                scale: 1 - Math.abs(clampedDist) * 0.15, // Softer scale for vertical
                z: -Math.abs(clampedDist) * 500, 
                opacity: Math.max(0, 1 - Math.abs(clampedDist) * 1.5), 
              });
            });
        };

        updateCards3DPhysics();

        const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              pin: true,
              scrub: 1.2,
              start: "top top",
              end: () => "+=" + getScrollDist(),
              invalidateOnRefresh: true,
              onRefresh: () => {
                 calculateLayout();
                 updateCards3DPhysics();
              }
            }
        });

        tl.to(track, {
            y: () => -getScrollDist(),
            ease: "none",
            onUpdate: updateCards3DPhysics
        }, 0);

        const progressBar = progressBarRef.current;
        if (progressBar) {
            gsap.set(progressBar, { transformOrigin: "left center" });
            tl.to(progressBar, { scaleX: 1, ease: "none" }, 0);
        }

        return () => {
            gsap.set(track, { clearProps: "all" });
            cards.forEach((c: any) => gsap.set(c, { clearProps: "all" }));
        };
    });

    return () => mm.revert();
  }, []);

  const ecosytemCards = [
    {
      title: t('card1Title'),
      desc: t('card1Desc'),
      image: null,
      videoLight: asset("/Files/Features/CRM_Light.mp4"),
      videoDark: asset("/Files/Features/GO_CRM_DArk.mp4#t=2"),
      videoDarkFullBackground: true,
      mediaClassNameDark: "dark:bg-[#0D0D0E]",
      cardClassNameDark: "dark:bg-[#0D0D0E]",
      logo: <CrmLogo className="h-10 w-auto mb-6 drop-shadow-[0_0_15px_rgba(90,200,250,0.5)]" />
    },
    {
      title: t('card4Title'),
      desc: t('card4Desc'),
      image: asset("/Files/Features/card_5_image.jpg"),
      videoLight: asset("/Files/Features/Go_AMS_Light.mp4"),
      logo: <AmsLogo className="h-10 w-auto mb-6 drop-shadow-[0_0_15px_rgba(90,200,250,0.5)]" />
    },
    {
      title: t('card6Title'),
      desc: t('card6Desc'),
      image: asset("/Files/Features/Wireframe_monitor_with_headset.jpeg"),
      logo: <CallsLogo className="h-10 w-auto mb-6 drop-shadow-[0_0_15px_rgba(90,200,250,0.5)]" />
    },
    {
      title: t('card7Title'),
      desc: t('card7Desc'),
      image: asset("/Files/Features/Diagonal_pipeline_CRM_stages_202606242208.jpeg"),
      logo: null
    }
  ];

  return (
      <section 
        ref={containerRef} 
        className="relative w-full h-screen overflow-hidden bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] z-20"
        style={{ perspective: '2000px' }}
      >
        {/* SCROLL PROGRESS INDICATOR */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex items-center justify-center z-50">
          <div className="w-[80px] md:w-[120px] h-[2px] bg-black/10 dark:bg-white/10 relative overflow-hidden rounded-full">
            <div 
              ref={progressBarRef}
              className="absolute top-0 left-0 h-full bg-[var(--color-text-Black-100)] dark:bg-[var(--color-text-White-100)] w-full origin-left transform-gpu scale-x-0"
            ></div>
          </div>
        </div>

        {/* DOM: Flex Column on Mobile, Flex Row on Desktop */}
        <div 
          ref={trackRef}
          className="absolute top-0 flex flex-col md:flex-row items-center justify-start w-full md:w-auto md:h-full will-change-transform transform-gpu z-10 gap-[5vh] md:gap-[3vw]" 
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* THE TITLE CARD */}
          <div 
            className="coverflow-card shrink-0 w-[85vw] lg:w-[40vw] h-[85vh] md:h-[100vh] relative transform-gpu flex flex-col justify-start pt-[12vh] md:pt-[15vh]"
            style={{ transformOrigin: 'center center' }}
          >
            <h2 className="text-display-lg text-[var(--color-text-Black-100)] dark:text-[var(--color-text-White-100)] text-left">
              {t('sectionTitle')}
            </h2>
            
            <div className="my-auto flex flex-col gap-static-xl md:gap-static-2xl -translate-y-6 md:-translate-y-10">
              <p className="text-body-lg text-[var(--color-text-muted)] font-light max-w-[500px] text-left">
                {t('sectionDesc')}
              </p>
              <div className="flex">
                <button className="group w-fit h-12 pl-6 pr-2 rounded-full flex items-center gap-3 bg-[var(--color-action-primary-bg)] text-[var(--color-action-primary-text)] shadow-elevation-2 transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-elevation-4">
                  <span className="text-body-sm font-medium">{th('ctaPlans')}</span>
                  <span className="relative w-8 h-8 rounded-full bg-[var(--color-action-primary-text)] text-[var(--color-action-primary-bg)] flex items-center justify-center overflow-hidden shrink-0">
                    <ArrowUR className="absolute w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-5 group-hover:-translate-y-5" />
                    <ArrowUR className="absolute w-4 h-4 -translate-x-5 translate-y-5 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0" />
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* THE IMAGE CARDS */}
          {ecosytemCards.map((card, idx) => (
            <div 
              key={idx} 
              className={`coverflow-card shrink-0 w-[85vw] lg:w-[50vw] h-[60vh] md:h-[60vh] rounded-[24px] overflow-hidden shadow-elevation-4 border border-[var(--color-border-Strokes-default)] relative transform-gpu flex flex-col md:flex-row ${(card as any).cardClassNameDark ? `bg-[var(--color-surface-BG-white)] ${(card as any).cardClassNameDark}` : 'bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)]'}`}
              style={{ transformOrigin: 'center center' }}
            >
              {/* Full Background Dark Video */}
              {(card as any).videoDark && (card as any).videoDarkFullBackground && (
                <>
                  <video 
                    autoPlay loop muted playsInline
                    src={(card as any).videoDark}
                    className="absolute inset-0 w-full h-full object-cover object-center z-0 hidden dark:block" 
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.6)_120%)] pointer-events-none z-[1] hidden dark:block" />
                  <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-black/40 to-transparent pointer-events-none z-[1] hidden dark:block" />
                </>
              )}

              {/* Text Side (Left on Desktop, Top on Mobile) */}
              <div className="w-full md:w-5/12 p-static-lg lg:p-static-2xl flex flex-col justify-center relative z-10 shrink-0">
                {card.logo && (
                   <div className="text-[var(--color-brand-blue)] dark:text-[var(--color-brand-cyan)] mb-static-sm lg:mb-static-md">
                      {card.logo}
                   </div>
                )}
                <h3 className="text-display mb-static-sm lg:mb-static-md text-[var(--color-text-Black-100)] dark:text-[var(--color-text-White-100)]">
                  {card.title}
                </h3>
                <p className="text-body-lg text-[var(--color-text-muted)] font-light max-w-[400px]">
                  {card.desc}
                </p>
              </div>

              {/* Media Side (Right on Desktop, Bottom on Mobile) */}
              <div className={`w-full md:w-7/12 flex-1 relative overflow-hidden ${(card as any).mediaClassNameDark ? (card as any).mediaClassNameDark : 'bg-black/5 dark:bg-white/5'} ${((card as any).videoDark && (card as any).videoDarkFullBackground) ? 'dark:hidden' : ''}`}>
                {(() => {
                  const hasLightVideo = !!(card as any).videoLight;
                  const hasDarkVideo = !!(card as any).videoDark && !(card as any).videoDarkFullBackground;
                  const hasImage = !!card.image;

                  return (
                    <>
                      {/* LIGHT MODE MEDIA */}
                      {hasLightVideo ? (
                        <video autoPlay loop muted playsInline src={(card as any).videoLight} className={`absolute inset-0 w-full h-full object-cover object-center ${hasDarkVideo || hasImage ? 'dark:hidden' : ''}`} />
                      ) : hasImage ? (
                        <img src={card.image} alt={card.title} className={`absolute inset-0 w-full h-full object-cover object-center ${hasDarkVideo ? 'dark:hidden' : ''}`} />
                      ) : null}

                      {/* DARK MODE MEDIA */}
                      {hasDarkVideo ? (
                        <video autoPlay loop muted playsInline src={(card as any).videoDark} className={`absolute inset-0 w-full h-full object-cover object-center ${(card as any).videoDarkClassName || ''} ${hasLightVideo || hasImage ? 'hidden dark:block' : ''}`} />
                      ) : (hasImage && hasLightVideo) ? (
                        <img src={card.image} alt={card.title} className="absolute inset-0 w-full h-full object-cover object-center hidden dark:block" />
                      ) : null}
                    </>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>
      </section>
  );
}
