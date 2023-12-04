<template>
  <div class="bg-white">
    <!-- Mobile menu -->
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-40 lg:hidden" @close="open = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div class="flex px-4 pb-2 pt-5">
                <button type="button" class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400" @click="open = false">
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <!-- Links -->
              <TabGroup as="div" class="mt-2">
                <div class="border-b border-gray-200">
                  <TabList class="-mb-px flex space-x-8 px-4">
                    <Tab as="template" v-for="category in navigation.categories" :key="category.name" v-slot="{ selected }">
                      <button :class="[selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900', 'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium']">{{ category.name }}</button>
                    </Tab>
                  </TabList>
                </div>
                <TabPanels as="template">
                  <TabPanel v-for="category in navigation.categories" :key="category.name" class="space-y-10 px-4 pb-8 pt-10">
                    <div class="space-y-4">
                      <div v-for="(item, itemIdx) in category.featured" :key="itemIdx" class="group aspect-h-1 aspect-w-1 relative overflow-hidden rounded-md bg-gray-100">
                        <img :src="item.imageSrc" :alt="item.imageAlt" class="object-cover object-center group-hover:opacity-75" />
                        <div class="flex flex-col justify-end">
                          <div class="bg-white bg-opacity-60 p-4 text-base sm:text-sm">
                            <a :href="item.href" class="font-medium text-gray-900">
                              <span class="absolute inset-0" aria-hidden="true" />
                              {{ item.name }}
                            </a>
                            <p aria-hidden="true" class="mt-0.5 text-gray-700 sm:mt-1">Shop now</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-for="(column, columnIdx) in category.sections" :key="columnIdx" class="space-y-10">
                      <div v-for="section in column" :key="section.name">
                        <p :id="`${category.id}-${section.id}-heading-mobile`" class="font-medium text-gray-900">{{ section.name }}</p>
                        <ul role="list" :aria-labelledby="`${category.id}-${section.id}-heading-mobile`" class="mt-6 flex flex-col space-y-6">
                          <li v-for="item in section.items" :key="item.name" class="flow-root">
                            <a :href="item.href" class="-m-2 block p-2 text-gray-500">{{ item.name }}</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>

              <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                <div v-for="page in navigation.pages" :key="page.name" class="flow-root">
                  <a :href="page.href" class="-m-2 block p-2 font-medium text-gray-900">{{ page.name }}</a>
                </div>
              </div>

              <div class="border-t border-gray-200 px-4 py-6">
                <a href="#" class="-m-2 flex items-center p-2">
                  <img src="https://tailwindui.com/img/flags/flag-canada.svg" alt="" class="block h-auto w-5 flex-shrink-0" />
                  <span class="ml-3 block text-base font-medium text-gray-900">CAD</span>
                  <span class="sr-only">, change currency</span>
                </a>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <header class="relative bg-white">
      <nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="border-b border-gray-200">
          <div class="flex h-16 items-center justify-between">
            <div class="flex flex-1 items-center lg:hidden">
              <button type="button" class="-ml-2 rounded-md bg-white p-2 text-gray-400" @click="open = true">
                <span class="sr-only">Open menu</span>
                <Bars3Icon class="h-6 w-6" aria-hidden="true" />
              </button>

              <a href="#" class="ml-2 p-2 text-gray-400 hover:text-gray-500">
                <span class="sr-only">Search</span>
                <MagnifyingGlassIcon class="h-6 w-6" aria-hidden="true" />
              </a>
            </div>

            <!-- Flyout menus -->
            <div class="hidden lg:block lg:flex-1 lg:self-stretch">
              <div class="flex h-full space-x-8">
                <a v-for="page in navigation.pages" :key="page.name" :href="page.href" class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">{{ page.name }}</a>
              </div>
            </div>

            <!-- Logo -->
            <a href="#" class="flex">
              <span class="sr-only">Your Company</span>
              <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </a>

            <div class="flex flex-1 items-center justify-end">
              <a href="#" class="hidden text-gray-700 hover:text-gray-800 lg:flex lg:items-center">
                <span class="ml-3 block text-sm font-medium">USD</span>
                <span class="sr-only">, change currency</span>
              </a>

              <!-- Account -->
              <a href="#" class="p-2 text-gray-400 hover:text-gray-500 lg:ml-4">
                <span class="sr-only">Account</span>
                <UserIcon class="h-6 w-6" aria-hidden="true" />
              </a>

              <!-- Cart -->
              <div class="ml-4 flow-root lg:ml-6">
                <a href="#" class="group -m-2 flex items-center p-2">
                  <ShoppingBagIcon class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                  <span class="sr-only">items in cart, view bag</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <main>
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
        <h1 class="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>

        <form class="mt-12">
          <section aria-labelledby="cart-heading">
            <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

            <ul role="list" class="divide-y divide-gray-200 border-b border-t border-gray-200">
              <li v-for="product in products" :key="product.id" class="flex py-6">
                <div class="flex-shrink-0">
                  <img :src="product.imageSrc" :alt="product.imageAlt" class="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32" />
                </div>

                <div class="ml-4 flex flex-1 flex-col sm:ml-6">
                  <div>
                    <div class="flex justify-between">
                      <h4 class="text-sm">
                        <a :href="product.href" class="font-medium text-gray-700 hover:text-gray-800">{{ product.name }}</a>
                      </h4>
                      <p class="ml-4 text-sm font-medium text-gray-900">{{ product.price }}</p>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p>
                    <p class="mt-1 text-sm text-gray-500">{{ product.size }}</p>
                  </div>

                  <div class="mt-4 flex flex-1 items-end justify-between">
                    <p class="flex items-center space-x-2 text-sm text-gray-700">
                      <CheckIcon v-if="product.inStock" class="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                      <ClockIcon v-else class="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
                      <span>{{ product.inStock ? 'In stock' : `Will ship in ${product.leadTime}` }}</span>
                    </p>
                    <div class="ml-4">
                      <button type="button" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </section>

          <!-- Order summary -->
          <section aria-labelledby="summary-heading" class="mt-10">
            <h2 id="summary-heading" class="sr-only">Order summary</h2>

            <div>
              <dl class="space-y-4">
                <div class="flex items-center justify-between">
                  <dt class="text-base font-medium text-gray-900">Subtotal</dt>
                  <dd class="ml-4 text-base font-medium text-gray-900">$96.00</dd>
                </div>
              </dl>
              <p class="mt-1 text-sm text-gray-500">Shipping and taxes will be calculated at checkout.</p>
            </div>

            <div class="mt-10">
              <button type="submit" class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">Checkout</button>
            </div>

          </section>
        </form>
      </div>
    </main>

    <footer aria-labelledby="footer-heading" class="bg-gray-50">
      <h2 id="footer-heading" class="sr-only">Footer</h2>
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="border-t border-gray-100 py-10 text-center">
          <p class="text-sm text-gray-500">&copy; 2023 HPU BS Shopping, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, UserIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { CheckIcon, ClockIcon } from '@heroicons/vue/20/solid'

const navigation = {
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
}
const products = [
  {
    id: 1,
    name: 'Artwork Tee',
    href: '#',
    price: '$32.00',
    color: 'Mint',
    size: 'Medium',
    inStock: true,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/checkout-page-03-product-04.jpg',
    imageAlt: 'Front of mint cotton t-shirt with wavey lines pattern.',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    price: '$32.00',
    color: 'Charcoal',
    inStock: true,
    size: 'Large',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg',
    imageAlt: 'Front of charcoal cotton t-shirt.',
  },
  {
    id: 3,
    name: 'Basic Tee',
    href: '#',
    price: '$32.00',
    color: 'Sienna',
    inStock: true,
    size: 'Large',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg',
    imageAlt: 'Front of sienna cotton t-shirt.',
  },
]

const open = ref(false)
</script>