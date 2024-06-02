<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('Users', function (Blueprint $table) {
            $table->id();
            $table->string('Name')->nullable();
            $table->string('PaternalSurname')->nullable();
            $table->string('MaternalSurname')->nullable();
            $table->integer('PhoneNumber')->nullable()->unsigned();
            $table->string('Address')->nullable();
            $table->string('Password')->nullable();
            $table->string('email')->nullable()->unique();
            $table->integer('created_id')->nullable()->unsigned();
            $table->integer('deleted_id')->nullable()->unsigned();
            $table->integer('updated_id')->nullable()->unsigned();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('UserData.Users');
    }
};
